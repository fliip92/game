simport React, { Component } from 'react'

export default class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startHealth: this.props.startHealth,
      currentHealth: this.props.startHealth,
      skin: Math.floor(Math.random() * 9)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.type !== this.props.type && nextProps.type === 'boss') {
      this.setState({
        startHealth: this.state.startHealth * 2,
        currentHealth: this.state.startHealth * 2
      });
    }
    if (nextProps.player.hitDmg && this.props.x === nextProps.player.hitX &&
      this.props.y === nextProps.player.hitY) {
      let _currentHealth = this.state.currentHealth - nextProps.player.hitDmg;
      _currentHealth = _currentHealth > 0 ? _currentHealth : 0;
      this.setState({
        currentHealth: _currentHealth
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    const fogSize = this.props.world.fogEnabled ? config.FOG_SIZE + 2 : 2;
    return (
      (this.props.x < nextProps.world.px + fogSize) &&
      (this.props.x > nextProps.world.px - fogSize) &&
      (this.props.y < nextProps.world.py + fogSize) &&
      (this.props.y > nextProps.world.py - fogSize) ||
      (this.props.world.fogEnabled !== nextProps.world.fogEnabled) ||
      (this.props.type !== nextProps.type)
    );
  }

  componentDidUpdate() {
    if (this.props.player.hitDmg && this.props.x === this.props.player.hitX &&
      this.props.y === this.props.player.hitY) {
      if (this.state.currentHealth > 0) {
        const dmg = config.BASE_DAMAGE * this.props.player.level + Math.floor(Math.random() * 10);
        setTimeout(() => this.props.hitPlayer(dmg), 100);
      } else {
        setTimeout(() => {
          if (this.props.player.fight) {
            if (this.props.type === 'boss') {
              this.props.changeGameStatus(1);
            }
            this.props.voidEnemy(this.props.x, this.props.y);
          }
        }, 200);
      }
    }
  }

  renderHealthBar() {
    return (
      <div className="enemy-health">
        <div
          className="bar"
          style={{ width: `${this.state.currentHealth * 100 / this.state.startHealth}%` }}
        ></div>
      </div>
    );
  }

  render() {
    let type;
    if (this.props.world.px === this.props.x &&
      this.props.world.py === this.props.y) {
      type = 'player';
    } else if (this.props.world.fogEnabled) {
      const fogSize = config.FOG_SIZE;
      type = (this.props.x > this.props.world.px + fogSize) ||
        (this.props.x < this.props.world.px - fogSize) ||
        (this.props.y > this.props.world.py + fogSize) ||
        (this.props.y < this.props.world.py - fogSize) ||
        (this.props.y === this.props.world.py - fogSize &&
          this.props.x === this.props.world.px - fogSize) ||
        (this.props.y === this.props.world.py + fogSize &&
          this.props.x === this.props.world.px - fogSize) ||
        (this.props.y === this.props.world.py - fogSize &&
          this.props.x === this.props.world.px + fogSize) ||
        (this.props.y === this.props.world.py + fogSize &&
          this.props.x === this.props.world.px + fogSize) ? 'fog' : this.props.type;
    } else {
      type = this.props.type;
    }

    let cssClass = 'map-cell';
    cssClass += ` -${type}`;
    cssClass += ` -skin${this.state.skin}`;
    cssClass += (type === 'boss' ? ' -boss' : '');
    cssClass += ((type === 'enemy' || type === 'boss') && this.state.currentHealth <= 0 ? ' -dead' : '');
    cssClass += (type === 'enemy' && this.props.player.fight &&
      this.props.player.hitX === this.props.x &&
      this.props.player.hitY === this.props.y ? ' -atack' : '');
    cssClass += (type === 'weapon' ? ` -weapon${this.props.world.weapon}` : '');
    cssClass += (type === 'player' && this.props.player.fight ? ' -atack' : '');
    cssClass += (type === 'player' && this.props.player.health <= 0 ? ' -playerDead' : '');

    return (
      <div className={cssClass}>
        {(type === 'enemy' || type === 'boss') && this.renderHealthBar()}
      </div>
    );
  }
}
