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

      // Marquer le chapitre comme visité SEULEMENT si c'est un combat ou un loot
      if (data.type === 'combat' || (data.loot && data.loot.length > 0)) {
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

  // fonction pour les attaques
  const attack = () => {
    // 1. Lancer les dés
    const playerRoll = rollDice() + rollDice()
    const enemyRoll = rollDice()

    // 2. Calculer les forces
    const playerStrength = playerRoll + playerAttack.value
    const enemyStrength = enemyRoll + chapter.value.enemy.attack

    let degat = 0

    // 3. Comparer et infliger des dégâts
    if (playerStrength >= enemyStrength) {
      // le joueur touche → le monstre perd des PV
      // dégâts = playerStrength - enemy.defense (minimum 1)
      degat = Math.max(1, playerStrength - chapter.value.enemy.defense)
      enemyHp.value -= degat // on soustrait les dégâts des PV
      combatLog.value.push(`Vous infligez ${degat} dégâts !`)
    } else {
      // le monstre touche → le joueur perd des PV
      // dégâts = enemyStrength - playerDefense (minimum 1)
      degat = Math.max(1, enemyStrength - playerDefense.value)
      playerHp.value -= degat
      combatLog.value.push(`Vous subissez ${degat} dégâts !`)
    }

    // 5. Vérifier si le combat est terminé
    // si enemyHp <= 0 → victoire

    if (enemyHp.value <= 0) {
      isFighting.value = false
      combatLog.value.push(`Vous avez vaincu ${chapter.value.enemy.name} !`)

      // Récupérer le loot de la victoire (une seule fois)
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
    }
    // si playerHp <= 0 → défaite
    else if (playerHp.value <= 0) {
      isFighting.value = false
      combatLog.value.push(`Vous avez été vaincu...`)
      // On redirige vers le chapitre de défaite
      loadChapter(chapter.value.onDefeat.nextChapterId)
    }
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
    startCombat,
    attack,
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
