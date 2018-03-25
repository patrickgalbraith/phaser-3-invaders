import Phaser from 'phaser'
import ISystem from '../Systems/ISystem'
import IEntity from '../Entities/IEntity'
import BackdropManager from '../Systems/BackdropManager'
import createPlayerShip from '../Assemblages/PlayerShip'
import createEnemySmall from '../Assemblages/EnemySmall'
import createSpaceBackdrop from '../Assemblages/SpaceBackdrop'
import displayLevelUpText from '../Helpers/LevelUpText'
import GameObjectManager from '../Systems/GameObjectManager';

export default class GameScene extends Phaser.Scene {
  private systems: ISystem[] = []
  private entities: IEntity[] = []

  constructor () {
    super({
      key: 'game'
    })
  }

  preload () {}

  create () {
    // Uncomment below to set default world bounds collisions
    //this.physics.world.setBoundsCollision(true, true, true, true)

    // Set default data
    const defaultData = {
      lives: 5,
      level: 1,
      score: 0
    }

    this.data.set('lives', defaultData.lives)
    this.data.set('level', defaultData.level)
    this.data.set('score', defaultData.score)

    // Show Game UI
    this.scene.launch('gameui', defaultData)

    // Event handlers
    this.events.on('setdata', () => { this.dataUpdate() })

    this.events.on('LOSE_LIFE', () => {
      this.data.set('lives', this.data.get('lives') - 1)
    })

    this.events.on('GAIN_LIFE', () => {
      this.data.set('lives', this.data.get('lives') + 1)
    })

    this.events.on('DESTROY_SMALL_ENEMY', () => {
      this.data.set('score', this.data.get('score') + 100)
    })

    this.events.on('DESTROY_MEDIUM_ENEMY', () => {
      this.data.set('score', this.data.get('score') + 250)
    })

    this.events.on('DESTROY_LARGE_ENEMY', () => {
      this.data.set('score', this.data.get('score') + 500)
    })

    // Crate Entities
    //this.entities.push(createPlayerShip())
    //this.entities.push(createEnemySmall())
    this.entities.push(createSpaceBackdrop())

    // Create Systems
    this.systems.push(new BackdropManager(this))
    this.systems.push(new GameObjectManager(this))

    // Handle System create methods
    this.systems.forEach(s =>
      s.create(this.entities, this.events, this.data.getAll()))

    // Show "Level 1" text
    this.displayLevelUp(1)
  }

  resize (width: number, height: number) {
    this.systems.forEach(s =>
      s.resize(this.entities, width, height, this.data.getAll()))
  }

  update (timestep: number, delta: number) {
    this.systems.forEach(s =>
      s.update(this.entities, timestep, delta, this.data.getAll()))
  }

  dataUpdate () {
    const lives = +this.data.get('lives')
    const level = +this.data.get('level')
    const score = +this.data.get('score')

    // Update Game UI
    this.updateGameUI({lives, level, score})

    // Check for game over condition
    if (lives <= 0) {
      this.scene.start('gameover', {
        score: score,
        level: level
      })
    }

    // Check for next level condition
    if (score >= level * 1000) {
      const newLevel = level + 1
      this.data.set('level', newLevel)
      this.displayLevelUp(newLevel)
    }
  }

  updateGameUI (data: any) {
    const gameUI: any = this.scene.get('gameui')
    gameUI.dataUpdate(data)
  }

  displayLevelUp (level: int) {
    displayLevelUpText(this, this.getWidth(), this.getHeight(), level)
  }

  getWidth () {
    return +this.sys.canvas.width
  }

  getHeight() {
    return +this.sys.canvas.height
  }
}