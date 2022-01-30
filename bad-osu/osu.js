class Vector2D {
  constructor(_x, _y) {
    this.x = _x || 0;
    this.y = _y || 0;
  }

  static add(_vec1, _vec2) {
    return new Vector2D(_vec1.x + _vec2.x, _vec1.y + _vec2.y);
  }

  static sub(_vec1, _vec2) {
    return new Vector2D(_vec1.x - _vec2.x, _vec1.y - _vec2.y);
  }

  static mul(_vec1, _vec2) {
    return new Vector2D(_vec1.x * _vec2.x, _vec1.y * _vec2.y);
  }

  static div(_vec1, _vec2) {
    return new Vector2D(_vec1.x / _vec2.x, _vec1.y / _vec2.y);
  }
}

class Camera {
  constructor(_position, _dimentions, _canvas) {
    this.position = _position || new Vector2D(0, 0);
    this.dimentions = _dimentions || new Vector2D(0, 0);
    this.canvas = _canvas || document.createElement("canvas");
    this.Context2D = this.canvas.getContext("2d");
  }

  clear() {
    this.Context2D.beginPath();
    this.Context2D.rect(0, 0, this.canvas.width, this.canvas.height);
    this.Context2D.fillStyle = "#e0e0ff";
    this.Context2D.fill();
    this.Context2D.closePath();
  }

  render(_objects) {}

  toScreenCoordinates(_vec) {
    var posStart = new Vector2D(
      this.position.x - this.dimentions.x / 2,
      this.position.y - this.dimentions.y / 2
    );
    return new Vector2D(
      ((_vec.x - posStart.x) / this.dimentions.x) * this.canvas.width,
      ((_vec.y - posStart.y) / this.dimentions.y) * this.canvas.height
    );
  }

  toWorldCoordinates(_vec) {
    var posStart = new Vector2D(
      this.position.x - this.dimentions.x / 2,
      this.position.y - this.dimentions.y / 2
    );
    return new Vector2D(
      (_vec.x / this.canvas.width) * this.dimentions.x + posStart.x,
      (_vec.y / this.canvas.height) * this.dimentions.y + posStart.y
    );
  }
}

class OsuHitObject {
  constructor(_pos, _time, _hitSound, _hitSample) {
    this.pos = _pos || new Vector2D(0, 0);
    this.time = _time || 0;
  }
}

class OsuCircle extends OsuHitObject {
  constructor(_pos, _time, _hitSound, _hitSample) {
    super.constructor(_pos, _time, _hitSound, _hitSample);
  }
}

class OsuSlider extends OsuHitObject {
  constructor(_pos, _time, _hitSound, _params, _hitSample) {
    super.constructor(_pos, _time, _hitSound, _hitSample);
  }
}

class OsuSpinner extends OsuHitObject {
  constructor(_pos, _time, _hitSound, _params, _hitSample) {
    super.constructor(_pos, _time, _hitSound, _hitSample);
  }
}

class OsuBeatmap {
  constructor(_fileStr, _songStr) {
    this.parseString(_fileStr);
    this.song = new Audio(_songStr);
  }

  parseString(_str) {
    var strLines = _str.split("\n");
    var lineParts;
    var objectsIndex = strLines.find("[Objects]") + 1;

    var gameObjectBuffer = [];

    for (var i = objectsIndex; i < strLines.length; i++) {
      lineParts = strLines[i].split(",");
      if(strLines[i].indexOf("[") != -1) {
        break;
      }

      if (parseInt(lineParts[3]) & 0b00000001) {
        gameObjectBuffer.push(new OsuCircle(new Vector2D(parseInt(lineParts[0]), parseInt(lineParts[1])), parseInt(lineParts[3])));
      } else if (parseInt(lineParts[3]) & 0b00000010) {
        gameObjectBuffer.push(new OsuSlider());
      } else if (parseInt(lineParts[3]) & 0b00001000) {
        gameObjectBuffer.push(new OsuSpinner());
      }
    }
    
    this.gameObjects = gameObjectBuffer;
  }
}
