import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameStore = defineStore('game', () => {
  // tes variables réactives ici (comme des ref)
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
    // si playerHp <= 0 → défaite
    if (enemyHp.value <= 0) {
      isFighting.value = false
      combatLog.value.push(`Vous avez vaincu ${chapter.value.enemy.name} !`)
      // On ne fait rien d'autre ici, le template affichera les choix de onVictory
    } else if (playerHp.value <= 0) {
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
      }
    } catch (error) {
      console.error(error)
    }
  }

  const resetGame = () => {
    playerHp.value = playerMaxHp.value
    isFighting.value = false
    combatLog.value = []
    enemyHp.value = 0
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
  }
})
