
const createCitizen = (house) => {
    function generateRandomName() {
        const firstNames = ["John", "Jane", "Doe", "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts"];

        const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts"];

        const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        return `${randomFirstName} ${randomLastName}`;
    };

    function findJob(city) {

    }

    return {
        /* PROPERTIES */
        name: generateRandomName(),
        age: Math.floor(Math.random() * 60) + 20,
        house,
        isEmployed: false,
        stateCounter: 0,
        job: null,

        /* METHODS */
        update(city) {
            if (this.isEmployed) {
                if (!this.job) {
                    this.isEmployed = false;
                    this.stateCounter = 0;
                }
            } else {

                if (this.job) {
                    this.isEmployed = true;
                    this.stateCounter = 0;
                }
            }

            this.stateCounter++;
        },

        toHTML() {
            const jobStatus = this.isEmployed ? this.job : "Unemployed"; 

            return `
                  <li class="info-citizen">
                    <span class="info-citizen-name">${this.name}</span>
                    <br>
                    <span class="info-citizen-details">
                      <span>
                        <img class="info-citizen-icon" src="public/icons/calendar.png">
                        ${this.age}
                      </span>
                      <span>
                        <img class="info-citizen-icon" src="public/icons/job.png">
                        ${jobStatus}
                      </span>
                    </span>
                  </li>
                `
        }
    }
}

export { createCitizen };