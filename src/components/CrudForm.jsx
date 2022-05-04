import React, { useState, useEffect, useContext } from 'react';
import CrudContext from '../context/CrudContext';

const initialForm = {
   name: '',
   constellation: '',
   id: null,
};

function CrudForm() {
   const [form, setForm] = useState(initialForm);
   const { createData, updateData, dataToEdit, setDataToEdit } =
      useContext(CrudContext);

   useEffect(() => {
      if (dataToEdit) {
         setForm(dataToEdit);
      } else {
         setForm(initialForm);
      }
   }, [dataToEdit]);

   const handleChange = (e) => {
      setForm({
         ...form,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      if (!form.name || !form.constellation) {
         alert('[!] Datos Incompletos');
         return;
      }
      if (form.id === null) {
         createData(form);
      } else {
         updateData(form);
      }
      handleReset();
   };

   const handleReset = (e) => {
      setForm(initialForm);
      setDataToEdit(null);
   };

   return (
      <div>
         <h3>{dataToEdit ? 'Editar' : 'Agregar'} </h3>
         <form onSubmit={handleSubmit}>
            <input
               type="text"
               name="name"
               placeholder="Name"
               onChange={handleChange}
               value={form.name}
            />
            <input
               type="text"
               name="constellation"
               placeholder="Constellation"
               onChange={handleChange}
               value={form.constellation}
            />
            <input type="submit" value="Enviar" />
            <input type="reset" value="Limpiar" onClick={handleReset} />
         </form>
      </div>
   );
}

export default CrudForm;
