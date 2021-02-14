/*
Boostrap Form form validaiton handler
Source: https://getbootstrap.com/docs/5.0/forms/validation/
Starter JavaScript for disabling form submissions if there are invalid fields
*/
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')
    console.log('I ran')
    console.log('forms')
  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()