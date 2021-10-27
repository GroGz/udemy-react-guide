class Human {
  hair = "Brown";
  printHair = () => {
    console.log(this.hair);
  };
}

class Person extends Human {
  name = "GroGz";

  printName = () => {
    console.log(this.name);
  }
}

const person = new Person();
person.printHair();
person.printName();
