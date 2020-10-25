//IIFE -- Immdiately Invoked Function Expression 
/* app.js created by Carlos Cruz-Claro 0N 2020-10-11 #300-902-439 */
(function() {
    function Start()
    {
        console.log("App Started...");

        //Get all delete buttons
        let deleteButtons = document.querySelectorAll('.btn-danger');
        
        for(button of deleteButtons) {
            button.addEventListener('click', (event) => {
                if(!confirm("Are you sure?")) {
                    event.preventDefault();
                    window.location.assign('/users')
                }
            });
        }

    }

    window.addEventListener("load", Start);

})();