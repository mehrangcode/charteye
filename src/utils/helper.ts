export function stateColor(state) {
    switch (state) {
      case 3:
        return "green";
      case 2:
        return "lightgreen";
      case 1:
        return "lightblue";
      case 0:
        return "white";
      case -1:
        return "yellow";
      case -2:
        return "orange";
      case -3:
        return "red";
    }
  }