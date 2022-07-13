CREATE DATABASE bootcamp;

\c bootcamp;

-- Tables
CREATE TABLE Region(codigo_region INT, nombre VARCHAR(30), CONSTRAINT pk_region PRIMARY KEY (codigo_region));
CREATE TABLE Comuna(codigo_comuna INT, nombre VARCHAR(30), codigo_region INT, CONSTRAINT pk_comuna PRIMARY KEY (codigo_comuna), CONSTRAINT fk_comuna_region FOREIGN KEY (codigo_region) REFERENCES region(codigo_region));
CREATE TABLE Tutor(codigo_tutor INT, rut VARCHAR(15), nombre VARCHAR(30), apellido_pat VARCHAR(30), apellido_mat VARCHAR(30), direccion VARCHAR(100), cargo VARCHAR(20), codigo_comuna INT, CONSTRAINT pk_tutor PRIMARY KEY (codigo_tutor), CONSTRAINT fk_tutor_comuna FOREIGN KEY (codigo_comuna) REFERENCES comuna(codigo_comuna));
CREATE TABLE Modulo(codigo_modulo INT, descripcion VARCHAR(100), duracion_horas INT, CONSTRAINT pk_modulo PRIMARY KEY (codigo_modulo));
CREATE TABLE Plan_Formativo(codigo_plan_formativo VARCHAR(30), descripcion VARCHAR(250), duracion_horas INT,CONSTRAINT pk_plan_formativo PRIMARY KEY (codigo_plan_formativo));
CREATE TABLE Plan_Modulo(codigo_plan_formativo VARCHAR(30), codigo_modulo INT, CONSTRAINT pk_plan_modulo PRIMARY KEY (codigo_plan_formativo, codigo_modulo), CONSTRAINT fk_plan_modulo_plan_formativo FOREIGN KEY (codigo_plan_formativo) REFERENCES plan_formativo(codigo_plan_formativo), CONSTRAINT fk_plan_modulo_modulo FOREIGN KEY (codigo_modulo) REFERENCES modulo(codigo_modulo));
CREATE TABLE Curso(codigo_curso VARCHAR(30), fecha_inicio DATE, fecha_termno DATE, codigo_comuna INT, codigo_plan_formativo VARCHAR(30), CONSTRAINT pk_curso PRIMARY KEY (codigo_curso), CONSTRAINT fk_curso_comuna FOREIGN KEY (codigo_comuna) REFERENCES comuna(codigo_comuna), CONSTRAINT fk_curso_plan_formativo FOREIGN KEY (codigo_plan_formativo) REFERENCES plan_formativo(codigo_plan_formativo));
CREATE TABLE Curso_Modulo_Tutor(codigo_curso VARCHAR(30), codigo_modulo INT, codigo_tutor INT, CONSTRAINT pk_curso_modulo_tutor PRIMARY KEY (codigo_curso, codigo_modulo, codigo_tutor), CONSTRAINT fk_curso_modulo_tutor_curso FOREIGN KEY (codigo_curso) REFERENCES curso(codigo_curso), CONSTRAINT fk_curso_modulo_tutor_modulo FOREIGN KEY (codigo_modulo) REFERENCES modulo(codigo_modulo), CONSTRAINT fk_curso_modulo_tutor_tutor FOREIGN KEY (codigo_tutor) REFERENCES tutor(codigo_tutor));
CREATE TABLE Estudiante(id_estudiante INT, rut VARCHAR(15), nombre VARCHAR(30), apellido_pat VARCHAR(30), apellido_mat VARCHAR(30), direccion VARCHAR(100), codigo_comuna INT, codigo_curso VARCHAR(30), CONSTRAINT pk_estudiante PRIMARY KEY (id_estudiante), CONSTRAINT fk_estudiante_comuna FOREIGN KEY (codigo_comuna) REFERENCES comuna(codigo_comuna), CONSTRAINT fk_estudiante_curso FOREIGN KEY (codigo_curso) REFERENCES curso(codigo_curso));

-- Inserts
-- creadas aparte en './database-inserts.sql'

-- Queries
-- 1. listado de estudiantes del curso 0012, en donde, se muestre el rut, nombre, apellidos y comuna (nombre de la comuna).
SELECT e.rut, e.nombre, e.apellido_pat, e.apellido_mat, e.codigo_curso, comuna.nombre FROM Estudiante e LEFT JOIN comuna ON e.codigo_comuna = comuna.codigo_comuna WHERE e.codigo_curso = '0012';

-- 2. listado de cursos de todos los cursos existentes hasta el momento, se necesita mostrar el código del curso, fecha de inicio y termino, la descripción del curso la duración en horas de cada uno.
SELECT c.codigo_curso, c.fecha_inicio, c.fecha_termno,plan_formativo.descripcion, plan_formativo.duracion_horas FROM curso c LEFT JOIN plan_formativo ON c.codigo_plan_formativo = plan_formativo.codigo_plan_formativo;

-- 3. listado de cada plan formativo con la cantidad de módulos de los que se compone
SELECT plan_formativo.descripcion, COUNT(modulo.codigo_modulo) FROM plan_formativo LEFT JOIN plan_modulo ON plan_formativo.codigo_plan_formativo = plan_modulo.codigo_plan_formativo LEFT JOIN modulo ON plan_modulo.codigo_modulo = modulo.codigo_modulo GROUP BY plan_formativo.codigo_plan_formativo;

-- 4. listado de módulos de los que se componen todos los planes formativos asociados a FullStack, el reporte debe mostrar el código del plan formativo, la descripción del mismo, código de los módulos y la descripción de los mismos
SELECT plan_formativo.codigo_plan_formativo, plan_formativo.descripcion, modulo.codigo_modulo, modulo.descripcion FROM plan_formativo LEFT JOIN plan_modulo ON plan_formativo.codigo_plan_formativo = plan_modulo.codigo_plan_formativo LEFT JOIN modulo ON plan_modulo.codigo_modulo = modulo.codigo_modulo WHERE plan_formativo.descripcion ~ 'FullStack';

