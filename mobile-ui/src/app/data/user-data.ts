

export class UserData {
	email:string;
	weight: string;
    sex: string;
    height: string;
    age: number;


	constructor(data) {
		//Assign a random (unique) ID. This may be useful for comparison (e.g., are two logged entries the same).
		this.email = data.email;
        this.weight = `${data["user-stats"]["weight"]} lb`;
        this.sex = data["user-stats"]["sex"];
        this.age = data["user-stats"]["age"]
        this.height = `${(data["user-stats"]["height"]-data["user-stats"]["height"]%12)/12} ft ${data["user-stats"]["height"]%12} inches`

        console.log(data)
	}



}
