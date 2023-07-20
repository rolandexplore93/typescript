let age: number = 20;
if (age < 50)
    age += 10;
    console.log(age)

let tag: number[] = [1, 2, 3]
// To use empty array, you have explicitly apply type annotation
let tag2: number[] = []
tag2[0] = 2
tag2[1] = 2
tag2.forEach(tg => tg.toString) //Typescript benefits cover code completiion or intellisense


// TUPLES: This is a fixed length array where each element has a particular type
// It is use when working with a pair of values. As a best practice, reduce tuples to only 2 value to prevent issues
// E.g Represent a user with an id and name (1, Roland)
let user: [number, string] = [1, 'Roland'];

// ENUM: Represent a list of related constants
// const small = 1;
// const medium = 2;
// const large = 3;
// PascalCase naming convention. 
// NB: Using a const to define an enum will generate a more optimize code
const enum Size { Small = 1, Medium = 2, Large = 3 };
let mySize: Size = Size.Medium;
console.log(mySize)

// FUNCTIONS
// As a best practice, always annotate your functions, all parameters and return value types and enable the 3 compilers options (noUnusedLocals: true, noUnusedParameters: true, noImplicitReturns: true)
function calculateTax(income: number, taxYear = 2022): number {
    if (income < 50_000 && taxYear < 2022)
        return income * 1.2
    return income * 1.3
};

calculateTax(40000, 2023);

// OBJECTS
// let employee: {
//     readonly id: number,  // readonly prevent the ts compiler from accidentally modifying the property 'name'
//     name: string,
//     retire: (date: Date) => void
// } = {
//     id: 1,
//     name: '',
//     retire: (date: Date) => {
//         console.log(date);
//     }
// };


// ADVANCED TYPES

// 1) ALIASES - This allows you to define custom type
// *a; it eliminates repetitive codes. E.g. Creating another employee will require repeating the employee {} above. DRY Principle - Don't Repeat Yourself
// *b; Case 2: Each employee can have additional properties. With this, there is no consistent shape of an employee {}
// *c; The initial repetitve employee {} structure makes the code hard to read and understand

// Employee is a single piece that defines the shape of employee object and it is resuable anywhere
type Employee = {
    readonly id: number,  // readonly prevent the ts compiler from accidentally modifying the property 'name'
    name: string,
    retire: (date: Date) => void
}

let employee1: Employee = {
    id: 1,
    name: 'Roland',
    retire: (date: Date) => {
        console.log(date);
    }
};

let employe2: Employee = {
    id: 2,
    name: 'Vincent',
    retire: (date: Date) => {
        console.log(date);
    }
};

type User = {
    name: string;
    age: number;
    occupation?: string;
};

let user1: User = {
    name: 'John Smith',
    age: 30,
    occupation: 'Software Engineer'
};

let user2: User = {
    name: 'Kate Muller',
    age: 28,
};

let users = [ user1, user2 ]

// Exercise: Birds fly. Fish swim. A Pet can be a Bird or Fish. Use type aliases to represent these
type Bird = {
    fly: () => void;
};

type Fish = {
    swim: () => void;
};

type Pet = Bird | Fish;


// 2) UNION TYPES (|) - This allows you to give a variable or function parameter more than one type.
function kgToLbs(weight: number | string): number {
    // narrowing technique
    if (typeof weight === 'number')
        return weight * 2.2
    else return parseInt(weight) * 2.2
};

kgToLbs(10)
kgToLbs('10kg')


// 3) INTERSECTION TYPES (&) - This combines many types
// E.g if you want to drag and resize something on the screen
type Draggable = {
    drag: () => void
};

type Resizable = {
    resize: () => void
};

type UIWidget = Draggable & Resizable; // This illustrates an Intersection type in typescript
let textBox: UIWidget = {
    drag: () => {},
    resize: () => {},
};


// 4) LITERAL TYPES (Exact or Specific) - This allows you to assign a specific value to a variable
type Quantity = 50 | 100;
let quantity: Quantity = 100

type Metrics = 'inch' | 'cm';
let measurement: Metrics = 'cm'

// Exercise: Define a type for representing the days of week. Valid values are “Monday”, “Tuesday”, etc.
type DaysOfTheWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';


// 5) NULLABLE TYPES: By default, Typescript flags null or undefined as a value. strictNullChecks is automatically enable in tsconfig and it should not be turned off.
// However, if you expect a null or undefined value, use the UNION TYPES to set the requirement
function greet(name: string | null | undefined ){
    if (name)
        console.log(name.toUpperCase())
    else 
        console.log('Holla')
}

greet('roland2rule')
greet(null)
greet(undefined)


// 6) OPTIONAL CHAINING
type Customer = {
    birthday?: Date
};

function getCustomer(id: number): Customer | null | undefined {
    return id === 0 ? null : { birthday: new Date() }
};

let customer = getCustomer(2);
// Optional property access operator ?.
console.log(customer?.birthday?.getFullYear())

// Optional element access operator (use in arrays)
// Customers?.[0]

//  Optional call operators
let log: any = null;
log?.('a')


// THE NULLISH COAELSING OPERATOR (??)
// ?? validates a condition where declared variable value is not NULL nor UNDEFINED
// In JavaScript, falsy values include NULL, UNDEFINED, '', False, 0. But there are situation where 0 is an expected result that you need, in this case use ?? operator. Example is found below.
let speed: number | null = null;
let ride = {
    speed: speed ?? 30   // if speed is not NULL or UNDEFINED, use the value of speed assigned. Otherwise, use 30 as the default value
}
console.log(ride.speed)



// OBJECT ORIENTED PROGRAMMING (OOP)
// OOP is a paradigms or style of programming. 
class Account {
    nickname?: string   // ? means optional property

    // readonly id: number;
    // owner: string;
    // private _balance: number

    constructor(public readonly id: number, public owner: string, private _balance: number ){
            // this.id: id;
            // this.owner: owner;
            // this._balance: balance
    }

    deposit(amount: number) {
        if (amount <= 0) throw new Error ('Amount is less than zero');
        this._balance += amount;
    }

    getBalance(): number {
        return this._balance
    };

    calculateTax(amount: number): number {
        let taxAmount: number;
        if (amount <= 12500) {
            taxAmount = 0
        } else if (amount > 12500 && amount < 50000) {
            taxAmount = (amount - 12500) * 0.2
        } else if (amount >= 50000 && amount < 10000) {
            taxAmount = (amount - 12500) * 0.4
        } else {
            taxAmount = (amount - 12500) * 0.45
        }
        return taxAmount
    }

    // Getter
    // get balance(): number {
    //     return this._balance
    // }

    // Setter
    // set balance (value: number) {
    //     if (value <= 0)
    //         throw new Error ('Invalid number. Input must be be greated than 0')
    //     this._balance = value
    // }
};
let account = new Account(1, 'Roland', 0);
account.deposit(500);
// account.balance = 20000
account.nickname = 'RollyJS'
console.log(account)
console.log(account.getBalance())
// console.log(account.balance)  // Getter approach
console.log(account.calculateTax(15500))
console.log(account instanceof Account);


// INDEX SIGNATURES
class SeatArrangement {
    // A1, A2, ...
    // 'Roland', 'Mosh', ...
    // Index signature property 
    [seatNumber: string]: string;
};

let seats = new SeatArrangement();
seats.A1 = 'Roland';
seats['A2'] = 'Mosh';
console.log(seats)


// STATIC MEMBER/PROPERTIES
// A static property is a property thats belong to the class and not the object. 
// You will only have 1 instance of the static property in the memory
class Ride {
    private static _activeRides: number = 0;

    start() {Ride._activeRides++};
    stop() {Ride._activeRides--};

    static get activeRides() {
        return Ride._activeRides
    }
};

let ride1 = new Ride()
ride1.start();

let ride2 = new Ride()
ride2.start();

let ride3 = new Ride()
ride3.start();

let ride4 = new Ride()
ride4.start();

// console.log(Ride.activeRides)
// At the console, I got result for each of ride 1 and ride 2 whereas i should i have a single result for rides.
// Explanation: ride 1 and ride 2 are objects and each object is in separate space in memory
// So, each ride is independently tracking the active rides which is the cause of the bug issues.
// To resolve this, what we need is a single pr global place where we can track the active rides. This is where STATIC PROPERTY comes in.


// INHERITANCE
// This is a mechanism in OOP that allows us to resue our code. 
// Children inherit properties from their parent
class Person {
    constructor (public firstName: string, public lastName: string) {
    }

    get fullName() {
        return this.firstName + ' ' + this.lastName
    }

    walk () {
        console.log('Walking')
    }
};

class Student extends Person {
    constructor (public studentId: number, firstName: string, lastName: string) {
        super(firstName, lastName)
    }

    takeTest(){
        console.log(`${this.fullName} with sid ${this.studentId} is taking a test`)
    }
}

class Teacher extends Person {
    override get fullName() {
        return 'Professor ' + super.fullName
    }
}

let teacher = new Teacher('Adams', 'Fred')
console.log(teacher.fullName)

