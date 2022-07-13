$("#filter").on("click", async () => {
   const regionName = $("#region").val()
   const courseCode = $("#course").val()

   if (!regionName && !courseCode) {
      generateAlert("`Elige una región y/o un curso`")
      return
   }

   const students = await getStudents(regionName, courseCode)
   if (students.length === 0) {
      generateAlert(`No se encontraron estudiantes en la región ${regionName} con el curso ${courseCode}`)
   } else {
      fillTable("#students-table", students)
   }
})

const getStudents = async (region = "all", courseCode = "all") => {
   const students = await fetch(`/students?region=${region}&course=${courseCode}`, {
      method: "GET",
   })
   return await students.json()
}

const fillTable = (tableId, students) => {
   const tbody = $(tableId).find("tbody")
   tbody.empty()
   students.forEach((student) => {
      tbody.append(`
         <tr>
            <td>${student.rut}</td>
            <td>${student.nombre}</td>
            <td>${student.apellido_pat}</td>
            <td>${student.apellido_mat}</td>
            <td>${student.codigo_curso}</td>
            <td>${student.descripcion}</td>
         </tr>
      `)
   })
}

const generateAlert = (text) => {
   const alert = new DocumentFragment()
   const alertContainer = document.createElement("div")
   alertContainer.classList.add("alert", "alert-danger", "alert-dismissible", "fade", "show")
   alertContainer.textContent = text
   const closeAlertBtn = document.createElement("button")
   closeAlertBtn.classList.add("btn-close")
   closeAlertBtn.setAttribute("data-bs-dismiss", "alert")
   closeAlertBtn.setAttribute("aria-label", "Close")
   alertContainer.append(closeAlertBtn)
   alert.append(alertContainer)

   $("body").prepend(alert)

   // close alert
   setTimeout(() => {
      $(".alert").alert("close")
   }, 2500)
}
