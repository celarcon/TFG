import React, { useEffect } from 'react'


const Relacionados = ({ ProdSelecionado,ProdRelacionados }) => {

    useEffect(() => {
        console.log(ProdRelacionados)
    }, [ProdSelecionado,ProdRelacionados])

    return (
        <div>
            {ProdSelecionado ?
            <div>
                <h1>Mi producto</h1>
                <ul>
                    <li >
                        {ProdSelecionado.nombre}
                    </li>
                    <li>    
                        <img src={'http://localhost:4000/products/get-image/' + ProdSelecionado.image} alt={ProdSelecionado.nombre} width="100"></img>
                    </li>
                    <li>    
                        {ProdSelecionado.descripcion}
                    </li>
                </ul>
                <h1>Productos relacionados con este producto:</h1>
                    {ProdRelacionados ? 
                    ProdRelacionados.map(rel=>
                        <p>
                            {rel.nombre}
                            <button>Me interesa</button>
                        </p>) : 
                    <h1>No hay relacionados</h1>}
                </div>
                :
                <h1>No hay ningun producto seleccionado</h1>
            }
        </div>
    )
}

export default Relacionados