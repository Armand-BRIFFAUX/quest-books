import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameStore = defineStore('game', () => {
  // tes variables réactives ici (comme des ref)

  const visitedChapters = ref([])

  const inventory = ref([]) // les objets dans le sac
  const equipment = ref({
    weapon: null, // emplacement arme
    armor: null, // emplacement amulette/armure
  })

  // stats du joueur
  const chapter = ref(null)
  const playerHp = ref(20)
  const playerMaxHp = ref(20)
  const playerAttack = ref(5)
  const playerDefense = ref(3)

  // stats des énemies
  const enemyHp = ref(0)
  const enemyMaxHp = ref(0)
  const isFighting = ref(false)
  const combatLog = ref([])
  const trapMessage = ref(null)

  // fonction qui choisi au hasard un chiffre entre 1 et 6
  const rollDice = () => Math.floor(Math.random() * 6) + 1

  // tes fonctions ici
  const loadChapter = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/chapters/${id}`)
      const data = await response.json()
      chapter.value = data

      // Récupérer le loot SEULEMENT si le chapitre n'a pas déjà été visité
      if (!visitedChapters.value.includes(data.id)) {
        if (data.loot && data.loot.length > 0) {
          for (const itemId of data.loot) {
            const itemResponse = await fetch(`http://localhost:3000/api/items/${itemId}`)
            const item = await itemResponse.json()
            addItem(item)
          }
        }
      }

      // Gérer les pièges (une seule fois par chapitre)
      trapMessage.value = null
      if (data.trap && !visitedChapters.value.includes(data.id)) {
        if (data.trap.type === 'damage') {
          playerHp.value = Math.max(0, playerHp.value - data.trap.value)
        } else if (data.trap.type === 'stealItem') {
          if (inventory.value.length > 0) {
            inventory.value.pop()
          }
        }
        trapMessage.value = data.trap.message

        // Mort par piège → défaite
        if (playerHp.value <= 0) {
          loadChapter(100)
          return
        }
      }

      // Marquer le chapitre comme visité si combat, loot OU piège
      if (data.type === 'combat' || (data.loot && data.loot.length > 0) || data.trap) {
        visitedChapters.value.push(data.id)
      }

      if (id === 1) {
        resetGame()
      }
      if (data.type === 'combat') {
        startCombat()
      }
    } catch (error) {
      console.error('Erreur lors du chargement :', error)
    }
  }

  // fonction qui initialise le combat
  const startCombat = () => {
    // 1. mettre isFighting à true
    isFighting.value = true

    // 2. récupérer les PV du monstre depuis chapter.value.enemy.hp
    // 3. les mettre dans enemyHp ET enemyMaxHp
    enemyHp.value = chapter.value.enemy.hp
    enemyMaxHp.value = chapter.value.enemy.hp

    // 4. vider le combatLog (tableau vide)
    combatLog.value = []
  }

  // Lance les dés et retourne les résultats (sans appliquer les dégâts)
  const rollAttack = () => {
    const playerDice = [rollDice(), rollDice()]
    const enemyDice = [rollDice(), rollDice()]
    const playerRoll = playerDice[0] + playerDice[1]
    const enemyRoll = enemyDice[0] + enemyDice[1]

    const playerStrength = playerRoll + playerAttack.value
    const enemyStrength = enemyRoll + chapter.value.enemy.attack
    const playerHits = playerStrength >= enemyStrength

    return { playerDice, enemyDice, playerRoll, enemyRoll, playerHits }
  }

  // Applique les dégâts à partir d'un résultat de rollAttack()
  const applyAttack = (result) => {
    const { playerRoll, enemyRoll, playerHits } = result
    const playerStrength = playerRoll + playerAttack.value
    const enemyStrength = enemyRoll + chapter.value.enemy.attack

    let degat = 0

    if (playerHits) {
      degat = Math.max(1, playerStrength - chapter.value.enemy.defense)
      enemyHp.value -= degat
      combatLog.value.push(`Vous infligez ${degat} dégâts !`)
    } else {
      degat = Math.max(1, enemyStrength - playerDefense.value)
      playerHp.value = Math.max(0, playerHp.value - degat)
      combatLog.value.push(`Vous subissez ${degat} dégâts !`)
    }

    if (enemyHp.value <= 0) {
      isFighting.value = false
      combatLog.value.push(`Vous avez vaincu ${chapter.value.enemy.name} !`)

      if (
        chapter.value.onVictory.loot &&
        !visitedChapters.value.includes('victory-' + chapter.value.id)
      ) {
        visitedChapters.value.push('victory-' + chapter.value.id)
        for (const itemId of chapter.value.onVictory.loot) {
          fetch(`http://localhost:3000/api/items/${itemId}`)
            .then((res) => res.json())
            .then((item) => addItem(item))
        }
      }
    } else if (playerHp.value <= 0) {
      combatLog.value.push(`Vous avez été vaincu...`)
      const defeatChapterId = chapter.value.onDefeat.nextChapterId
      loadChapter(defeatChapterId).then(() => {
        isFighting.value = false
      })
    }
  }

  // Raccourci rétrocompatible : lance + applique immédiatement
  const attack = () => {
    const result = rollAttack()
    applyAttack(result)
    return result
  }

  const saveGame = async () => {
    const token = localStorage.getItem('token')

    try {
      const response = await fetch('http://localhost:3000/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          chapterId: chapter.value.id,
          playerHp: playerHp.value,
          isFighting: isFighting.value,
          playerAttack: playerAttack.value,
          playerDefense: playerDefense.value,
          inventory: JSON.stringify(inventory.value),
          equipment: JSON.stringify(equipment.value),
          visitedChapters: JSON.stringify(visitedChapters.value),
        }),
      })
      const data = await response.json()

      if (response.ok) {
        alert('Partie sauvegardée !')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const loadGame = async () => {
    const token = localStorage.getItem('token')

    try {
      const response = await fetch('http://localhost:3000/api/save', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()

      if (response.ok) {
        await loadChapter(data.chapterId)
        playerHp.value = data.playerHp
        playerAttack.value = data.playerAttack
        playerDefense.value = data.playerDefense
        inventory.value = JSON.parse(data.inventory)
        equipment.value = JSON.parse(data.equipment)
        visitedChapters.value = JSON.parse(data.visitedChapters)

        if (data.isFighting === false && chapter.value.type === 'combat') {
          isFighting.value = false
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const addItem = (item) => {
    // ajouter l'item dans le tableau inventory
    inventory.value.push(item)
  }

  const useItem = (itemId) => {
    const item = inventory.value.find((i) => i.id === itemId)
    if (!item) return

    if (item.type === 'potion') {
      // ajouter item.effect.value aux PV (sans dépasser le max !)
      playerHp.value = Math.min(playerMaxHp.value, playerHp.value + item.effect.value)
      // retirer l'objet de l'inventaire
      inventory.value = inventory.value.filter((i) => i.id !== itemId)
    }

    if (item.type === 'equipment') {
      if (item.slot === 'armor') {
        equipment.value.armor = item
        playerDefense.value += item.effect.value
      }

      if (item.slot === 'weapon') {
        equipment.value.weapon = item
        playerAttack.value += item.effect.value
      }

      inventory.value = inventory.value.filter((i) => i.id !== itemId)
    }
  }

  const resetGame = () => {
    playerHp.value = playerMaxHp.value
    playerDefense.value = 3 // ← valeur de base
    playerAttack.value = 5 // ← valeur de base
    isFighting.value = false
    combatLog.value = []
    enemyHp.value = 0
    equipment.value.weapon = null
    equipment.value.armor = null
    inventory.value = []
    visitedChapters.value = []
    trapMessage.value = null
  }

  // retourne tout ce que tu veux rendre accessible
  return {
    chapter,
    playerHp,
    playerMaxHp,
    playerAttack,
    playerDefense,
    loadChapter,
    enemyHp,
    enemyMaxHp,
    isFighting,
    combatLog,
    trapMessage,
    startCombat,
    attack,
    rollAttack,
    applyAttack,
    resetGame,
    saveGame,
    loadGame,
    inventory,
    equipment,
    useItem,
    addItem,
    visitedChapters,
  }
})
