describe("Dashboard page test cases", ()=>{
    it('Do login with correct password',()=>{
        cy.visit("http://localhost:3000/");
        //type email
        const email = cy.get("input[name='email']");
        email.type("user@react.test")
        //type password
        const password = cy.get("input[name='password']");
        password.type("password")
        //click login
        const button = cy.get("button");
        button.click()
        cy.on('window:alert',(text)=>{
            expect(text).to.contains('welcome')
        });
        cy.url().should("eq","http://localhost:3000/dashboard");
    });
    it('Found no post for the first time',()=>{
        cy.contains("Found 0 photos");
    });
    it("Contains image url and description input, and publish button", ()=>{
        //image input component
        const image = cy.get("input[name='image']");
        image.should("be.visible");
        image.should("have.attr", "type", "url");
        image.should("have.attr", "required", "required");
        image.should("have.attr", "placeholder", "Image URL");
        //description input component
        const description = cy.get("input[name='desc']");
        description.should("be.visible");
        description.should("have.attr", "type", "text");
        description.should("have.attr", "required", "required");
        description.should("have.attr", "placeholder", "What's on your mind?");
        //button component
        const button = cy.get("button");
        button.should("be.visible");
        button.contains("Publish!");
        button.should("have.css", "background-color","rgb(79, 70, 229)");
        button.should("have.css", "color", "rgb(255, 255, 255)");
    });
    it("Upload some photos", ()=>{
        const photos = [
            {
                imageValue:"https://img.freepik.com/free-vector/flower-background-aesthetic-border-vector-remixed-from-vintage-public-domain-images_53876-144443.jpg?w=740&t=st=1661244745~exp=1661245345~hmac=80085ff9500def797e16590251e189bbbecceaacbed6d678e620beaabc052be1",
                descriptionValue: "Image 1: Lorem Ipsum"
            },
            {
                imageValue:"https://img.freepik.com/premium-photo/beautiful-forest-landscape-3d-illustration_533101-1438.jpg?w=900",
                descriptionValue: "Image 2: Lorem Ipsum"
            }
        ];
        photos.forEach(({imageValue,descriptionValue})=>{
            const image = cy.get("input[name='image']");
            image.type(imageValue);
            const description = cy.get("input[name='desc']");
            description.type(descriptionValue);
            const button = cy.get("button");
            button.click();
            //check upload image
            cy.get("img").should("have.attr", "src", imageValue);
            cy.contains(descriptionValue);
        });
        cy.contains(`Found ${photos.length} photos`);
    });
});