//IIFE -- Immdiately Invoked Function Expression 
/* app.js created by Carlos Cruz-Claro 0N 2020-10-11 #300-902-439 */
(function() {
    function Start()
    {
        console.log("App Started...");

        //Get all delete buttons
        let deleteButtons = document.querySelectorAll('.btn-danger');
        
        //Listen for a click event on 'Danger delete button'. 
        for(button of deleteButtons) {
            button.addEventListener('click', (event) => { //show a event
                if(!confirm("Are you sure?")) {
                    event.preventDefault();
                    window.location.assign('/users') //assign the window the /users page
                }
            });
        }

    }

    window.addEventListener("load", Start);

})();