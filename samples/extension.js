function onVideoPlay() {
  this.setState({visible: false});
}

function onVideoPause(e) {
      this.setState({visible: true});
  }

function myExtension(config, player, view) {
  this.config = config;
  this.player = player;
  config.xOffset = config.xOffset || 150;
  config.yOffset = config.yOffset || 190;
  config.src = config.src || 'http://mockup.on.aol.com/Adam/playerSdk/Aol.png';
  config.width = config.width || 250;

  console.log(player)

  view.getContainer(view.PLAYER_CONTAINER)
    .then(this.createView.bind(this))
    .catch(this.onError.bind(this));
}

myExtension.prototype.onError = function (error) {
  setTimeout(function () {
    throw error;
  }, 0);
}

myExtension.prototype.createView = function (tagContainer) {
  var config = this.config;
  var container = document.createElement('div');
  var inner = document.createElement('div');
  var style;

  style = container.style;
  style.width = '100%';
  style.height = '100%'
  style.position = 'relative';
  style.zIndex = '10';
  tagContainer.appendChild(container);

  style = inner.style;
  style.position = 'absolute';
  style.right = this.config.xOffset + 'px';
  style.bottom = this.config.yOffset + 'px';
  container.appendChild(inner);

  var image = new Image();
  image.src = config.src;
  style = image.style;
  style.color = '#fff';
  style.pointerEvents = 'visible';
  style.width = config.width + 'px';
  inner.appendChild(image);
  this.icon = image;

  this.player.addEventListener(vidible.VIDEO_PLAY, onVideoPlay.bind(this));
  this.player.addEventListener(vidible.VIDEO_PAUSE, onVideoPause.bind(this));

  this.setState({visible: false});
}

myExtension.prototype.setState = function (state) {
  if (state.visible) {
    this.icon.style.display = 'block';
  }
  else {
    this.icon.style.display = 'none';
  }
}

vidible.extension('myExtension', function (config, player, view) {


  console.log("player", player);
  console.log("config", config);
  console.log("view", view);

  return new myExtension(config, player, view);
});