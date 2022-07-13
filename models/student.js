/*=============================================
=               IMPORT MODULES                =
=============================================*/
// Local modules
const client = require("../config/db.config")

/*=============================================
=                   QUERIES                   =
=============================================*/
// Get
const getStudents = async () => {
   // Query Conf
   const queryConf = {
      text: "SELECT * FROM Estudiante",
   }

   try {
      const students = await client.query(queryConf)
      return students.rows
   } catch (err) {
      console.error(`Error getting students from DB:\n${err}`)
      throw err
   }
}

const getFilteredStudents = async (regionName, courseCode) => {
   let text,
      values = []
   // Query Conf
   if (regionName === "all" && courseCode === "all") {
      text =
         "SELECT e.rut, e.nombre, e.apellido_pat, e.apellido_mat , e.codigo_curso, pf.descripcion FROM Estudiante e LEFT JOIN Curso cu ON e.codigo_curso = cu.codigo_curso LEFT JOIN Plan_Formativo pf ON cu.codigo_plan_formativo = pf.codigo_plan_formativo LEFT JOIN Comuna co ON e.codigo_comuna = co.codigo_comuna LEFT JOIN Region r ON co.codigo_region = r.codigo_region"
   } else if (regionName === "all") {
      text =
         "SELECT e.rut, e.nombre, e.apellido_pat, e.apellido_mat , e.codigo_curso, pf.descripcion FROM Estudiante e LEFT JOIN Curso cu ON e.codigo_curso = cu.codigo_curso LEFT JOIN Plan_Formativo pf ON cu.codigo_plan_formativo = pf.codigo_plan_formativo LEFT JOIN Comuna co ON e.codigo_comuna = co.codigo_comuna LEFT JOIN Region r ON co.codigo_region = r.codigo_region WHERE e.codigo_curso = $1;"
      values = [courseCode]
   } else if (courseCode === "all") {
      text =
         "SELECT e.rut, e.nombre, e.apellido_pat, e.apellido_mat , e.codigo_curso, pf.descripcion FROM Estudiante e LEFT JOIN Curso cu ON e.codigo_curso = cu.codigo_curso LEFT JOIN Plan_Formativo pf ON cu.codigo_plan_formativo = pf.codigo_plan_formativo LEFT JOIN Comuna co ON e.codigo_comuna = co.codigo_comuna LEFT JOIN Region r ON co.codigo_region = r.codigo_region WHERE r.nombre = $1;"
      values = [regionName]
   } else {
      text =
         "SELECT e.rut, e.nombre, e.apellido_pat, e.apellido_mat , e.codigo_curso, pf.descripcion FROM Estudiante e LEFT JOIN Curso cu ON e.codigo_curso = cu.codigo_curso LEFT JOIN Plan_Formativo pf ON cu.codigo_plan_formativo = pf.codigo_plan_formativo LEFT JOIN Comuna co ON e.codigo_comuna = co.codigo_comuna LEFT JOIN Region r ON co.codigo_region = r.codigo_region WHERE e.codigo_curso = $1 AND r.nombre = $2;"
      values = [courseCode, regionName]
   }

   const queryConf = {
      text,
      values,
   }

   try {
      const filteredStudents = await client.query(queryConf)
      return filteredStudents.rows
   } catch (err) {
      console.error(`Error getting filtered students from DB:\n${err}`)
      throw err
   }
}

const getFormattedStudents = async () => {
   // Query Conf
   const queryConf = {
      text: "SELECT e.rut, e.nombre, e.apellido_pat, e.apellido_mat , e.codigo_curso, pf.descripcion FROM Estudiante e LEFT JOIN Curso c ON e.codigo_curso = c.codigo_curso LEFT JOIN Plan_Formativo pf ON c.codigo_plan_formativo = pf.codigo_plan_formativo RETURNING *",
   }

   try {
      const students = await client.query(queryConf)
      return students.rows
   } catch (err) {
      console.error(`Error getting formatted students from DB:\n${err}`)
      throw err
   }
}
/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = {
   getStudents,
   getFilteredStudents,
}
