const grid = new Muuri('.grid',{
    layout: {
        rounding: false
      }
});
//agregamos los listener para filtrar por categoria
window.addEventListener('load', () => {
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas');

    const enlaces = document.querySelectorAll('#categorias a');
    enlaces.forEach( (elemento) =>{
        elemento.addEventListener('click', (evento) =>{
            evento.preventDefault();
            enlaces.forEach( (enlace) => enlace.classList.remove('activo'));
            evento.target.classList.add('activo');

            const categoria = evento.target.innerHTML.toLowerCase();
            categoria ==='todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
        });
    });

    //listener para la barra de busqueda

    document.querySelector('#busqueda').addEventListener('input', (evento) =>{
        const busquedad = evento.target.value;
        grid.filter((item) => item.getElement().dataset.etiquetas.includes(busquedad));//permite mostrar los elemntos que cumplen con cada uno de los parámetros
    });

    //listener para las imagenes

    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach( (elemento)=>{
        const ruta = elemento.getAttribute('src');
        const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
        elemento.addEventListener('click',()=>{
            overlay.classList.add('activo');
            document.querySelector('#overlay img').src = ruta;
            document.querySelector('#overlay .descripcion').innerHTML = descripcion;
        });
    });

    //eventlistener boton cerrar
    document.querySelector('#btn-cerrar-popup').addEventListener('click',() =>{
        overlay.classList.remove('activo');
    });

    //eventlistener del overlay
    overlay.addEventListener('click',(evento)=>{
        evento.target.id ==='overlay' ? overlay.classList.remove('activo') : '';
    })
});