import operate from "./operate";
import isNumber from "./isNumber";

export default function calculate(obj, buttonName) {
  if (buttonName === "AC") {
    return {
      total: null,
      next: null,
      operation: null
    };
  }

  if (isNumber(buttonName)) {
    if (buttonName === "0" && obj.next === "0") {
      return {};
    }

    if (obj.operation) {
      if (obj.next) {
        return { next: obj.next + buttonName };
      }
      return { next: buttonName };
    }

    if (obj.next) {
      return {
        next: obj.next + buttonName,
        total: null
      };
    }
    return {
      next: buttonName,
      total: null
    };
  }

  if (buttonName === ".") {
    if (obj.next) {
      if (obj.next.includes(".")) {
        return {};
      }
      return { next: obj.next + "." };
    }
    if (obj.operation) {
      return { next: "0." };
    }
    if (obj.total) {
      if (obj.total.includes(".")) {
        return {};
      }
      return { total: obj.total + "." };
    }
    return { total: "0." };
  }

  if (buttonName === "=") {
    if (obj.next && obj.operation) {
      return {
        total: operate(obj.total, obj.next, obj.operation),
        next: null,
        operation: null
      };
    } else {
      return {};
    }
  }

  if (buttonName === "+/-") {
    if (obj.next) {
      return { next: (-1 * parseFloat(obj.next)).toString() };
    }
    if (obj.total) {
      return { total: (-1 * parseFloat(obj.total)).toString() };
    }
    return {};
  }
  if (buttonName === "sin") {
    if (obj.next) {
      return {
        next: Math.sin((parseFloat(obj.next) * Math.PI) / 180).toString()
      };
    }
    return {};
  }
  if (buttonName === "cos") {
    if (obj.next) {
      return {
        next: Math.cos((parseFloat(obj.next) * Math.PI) / 180).toString()
      };
    }
    return {};
  }
  if (buttonName === "tan") {
    if (obj.next) {
      return {
        next: Math.tan((parseFloat(obj.next) * Math.PI) / 180).toString()
      };
    }
    return {};
  }

  if (obj.operation) {
    return {
      total: operate(obj.total, obj.next, obj.operation),
      next: null,
      operation: buttonName
    };
  }

  if (!obj.next) {
    return { operation: buttonName };
  }

  // save the operation and shift 'next' into 'total'
  return {
    total: obj.next,
    next: null,
    operation: buttonName
  };
}
