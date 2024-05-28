

export class PriorityQueue<Type> {
    // private parent = (i : number) => ((i + 1) >>> 1) - 1;
    // private left = (i : number) => (i << 1) + 1;
    // private right = (i : number) => (i + 1) << 1;
    private map = new Map<Type, number>();
    private _heap : Type[];
    private _comparator: (a : Type, b : Type) => boolean;
    private _equals : (a : Type, b : Type) => boolean;

    constructor(comparator = (a : Type, b : Type) => a > b, 
    equals = (a : Type, b : Type) => a == b) {
        this._heap = [];
        this._comparator = comparator;
        this._equals = equals;
    }

    swap(i : number, j : number) {
        const temp = this._heap[i]
        this._heap[i] = this._heap[j]
        this._heap[j] = temp;
        this.map.set(this._heap[i], i)
        this.map.set(this._heap[j], j)
    }

    length() {
        return this._heap.length;
    }

    insert(value : Type) {
        console.log("inserting")
        this._heap[this._heap.length] = value;
        this.map.set(this._heap[this._heap.length], this._heap.length);
        var i : number = this._heap.length - 1;
        while (i > 0) {
            //if child is less than the parent
            if (this._comparator(this._heap[Math.floor((i+1)/2) -1], this._heap[i])) {
                this.swap(i, Math.floor((i+1)/2) - 1);
                i = Math.floor((i+1)/2) -1;
            } else {
                break;
            }
        }
    }

    extractMin() {
        console.log("extracting")
        console.log(this._heap)
        //delete root : 
        //0 : store the root value, remove it from the map
        const answer = this._heap[0];
        this.map.delete(this._heap[0]);
        //1 : move the last to the root
        this._heap[0] = this._heap[this._heap.length - 1]
        this.map.set(this._heap[0], 0);
        this._heap.pop()
        //3 : bubble down.
        var i : number = 0;
        //while left child is in the heap.
        while (2 * i + 1 <= this._heap.length - 1) {

            //swap with the value of the minimum of the two children
            if (2 * i + 2 > this._heap.length - 1 || //if the right child is not in the map
                 this._comparator(this._heap[2 * i + 2], this._heap[2 * i + 1])) {

                //if i greater than left child, swap down
                if (this._comparator(this._heap[i] , this._heap[2 * i + 1])) {
                    this.swap(i, 2 * i + 1);
                } else {
                    break;
                }

            //if i greater than right child, swap down
            } else if (this._comparator(this._heap[i] , this._heap[2 * i + 2])) {
                this.swap(i, 2 * i + 2)
            } else {
                break;
            }
        }
        return answer;
    }

    decreaseKey(newType : Type) {
        console.log("decreasing")
        //find the correct value
        var correctType : Type;
        var correctIndex : number;
        var found : boolean = false;
        for (let i = 0; i < this._heap.length; i++) {
            if (this._equals(this._heap[i], newType)) {
                correctType = this._heap[i]
                correctIndex = i;
                found = true;
            }
        }
        //if it didnt exist in the heap already, insert it in
        if (found == false) {
            this.insert(newType)
        }
        else if (this._comparator(correctType!, newType)) {
            //update the priority, if the new type is smaller than the old type 
            this.map.delete(correctType!);
            this._heap[correctIndex!] = newType;
            this.map.set(newType, correctIndex!);

            //then bubble down
            let i = correctIndex!;
            while (i > 0) {
                //if parent more than child
                if (this._comparator(this._heap[Math.floor((i+1)/2) -1], this._heap[i])) {
                    this.swap(i, Math.floor((i+1)/2) - 1);
                    i = Math.floor((i+1)/2) -1;
                } else {
                    break;
                }
            }

        }
        
    }
}