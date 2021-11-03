/**
 * Abstract Factory 인터페이스는
 * 다른 추상 제품 을 반환하는 메소드 세트를 선언합니다 .
 * 이러한 제품을 패밀리라고 하며 높은 수준의 테마 또는 개념으로 관련되어 있습니다.
 * 한 가족의 제품은 일반적으로 서로 협력할 수 있습니다.
 * 제품군에는 여러 변형이 있을 수 있지만 한 변형의 제품은 다른 변형의 제품과 호환되지 않습니다.
 */
interface AbstractFactory {
  createProductA(): AbstractProductA;

  createProductB(): AbstractProductB;
}

/**
 * 콘크리트 공장은 단일 변형에 속하는 제품군을 생산합니다.
 * 공장은 결과 제품이 호환됨을 보장합니다.
 *
 * 참고
 * 콘크리트 공장의 메소드의 서명이 추상적 제품을 반환 할 것을 방법 내부에 콘크리트 제품이 인스턴스화된다.
 */
class ConcreteFactory1 implements AbstractFactory {
  public createProductA(): AbstractProductA {
    return new ConcreteProductA1();
  }

  public createProductB(): AbstractProductB {
    return new ConcreteProductB1();
  }
}

/**
 * 각 Concrete Factory에는 해당 제품 변형이 있습니다.
 */
class ConcreteFactory2 implements AbstractFactory {
  public createProductA(): AbstractProductA {
    return new ConcreteProductA2();
  }

  public createProductB(): AbstractProductB {
    return new ConcreteProductB2();
  }
}

/**
 * 제품군의 각 개별 제품에는 기본 인터페이스가 있어야 합니다.
 * 제품의 모든 변형은 이 인터페이스를 구현해야 합니다.
 */
interface AbstractProductA {
  usefulFunctionA(): string;
}

/**
 * 이러한 콘크리트 제품은 해당 콘크리트 공장에서 생성됩니다.
 */
class ConcreteProductA1 implements AbstractProductA {
  public usefulFunctionA(): string {
    return "The result of the product A1.";
  }
}

class ConcreteProductA2 implements AbstractProductA {
  public usefulFunctionA(): string {
    return "The result of the product A2.";
  }
}

/**
 * 다음은 다른 제품의 기본 인터페이스입니다. 모든 제품이 상호 작용할 수 있음
 * 서로간에 적절한 상호작용이 가능하지만, 적절한 상호작용은 다음 제품의 제품들 사이에서만 가능합니다.
 * 동일한 콘크리트 변종.
 */
interface AbstractProductB {
  /**
   * B제품은 자체적인 작업을 할 수 있습니다...
   */
  usefulFunctionB(): string;

  /**
   *...그러나 ProductA와 협업할 수도 있습니다.
   * Abstract Factory는 자신이 만든 모든 제품이
   * 동일한 변형이므로 호환됩니다.
   */
  anotherUsefulFunctionB(collaborator: AbstractProductA): string;
}

/**
 * 본 콘크리트 제품은 해당 콘크리트 공장에서 생산한다.
 */
class ConcreteProductB1 implements AbstractProductB {
  public usefulFunctionB(): string {
    return "The result of the product B1.";
  }

  /**
   * 변형 모델인 제품 B1은 변형 모델에서만 올바르게 작동할 수 있습니다.
   * 제품 A1. 그럼에도 불구하고, 그것은 AbstractProductA의 모든 인스턴스를 다음과 같이 받아들인다.
   * 논쟁.
   */
  public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
    const result = collaborator.usefulFunctionA();
    return `The result of the B1 collaborating with the (${result})`;
  }
}

class ConcreteProductB2 implements AbstractProductB {
  public usefulFunctionB(): string {
    return "The result of the product B2.";
  }

  /**
   * 변형 모델인 제품 B2는 변형 모델에서만 올바르게 작동할 수 있습니다.
   * 제품 A2. 그럼에도 불구하고, 그것은 AbstractProductA의 모든 인스턴스를 다음과 같이 받아들인다.
   * 논쟁.
   */
  public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
    const result = collaborator.usefulFunctionA();
    return `The result of the B2 collaborating with the (${result})`;
  }
}

/**
 * 클라이언트 코드는 공장 및 제품과 추상적으로만 작동합니다.
 * 유형: AbstractFactory 및 AbstractProduct. 이것은 당신이 어떤 공장이나
 * 깨지지 않고 클라이언트 코드에 대한 제품 하위 클래스.
 */
function clientCode(factory: AbstractFactory) {
  const productA = factory.createProductA();
  const productB = factory.createProductB();

  console.log(productB.usefulFunctionB());
  console.log(productB.anotherUsefulFunctionB(productA));
}

/**
 * The client code can work with any concrete factory class.
 */
console.log("Client: Testing client code with the first factory type...");
clientCode(new ConcreteFactory1());

console.log("");

console.log(
  "Client: Testing the same client code with the second factory type..."
);
clientCode(new ConcreteFactory2());

// --------------------------------------------------------------------------
// Client: Testing client code with the first factory type...
// The result of the product B1.
// The result of the B1 collaborating with the (The result of the product A1.)

// Client: Testing the same client code with the second factory type...
// The result of the product B2.
// The result of the B2 collaborating with the (The result of the product A2.)
