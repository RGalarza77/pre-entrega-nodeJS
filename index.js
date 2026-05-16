
const [, , method, endpoint, ...argvProducto] = process.argv;

// console.log("Metodo: ", method);
// console.log("Endpoint: ", endpoint);
// console.log("Producto: ", argvProducto);

const[recurso, id=-1] = endpoint.split("/");
// console.log("Endpoint: ",recurso, id);

switch(method.toLowerCase()){
    case "get":
        if(endpoint.startsWith("products/") && id > 0 ){
            try{
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                const data= await response.json();
                console.log(data);
            }catch (error){
                console.error(`Error al realizar el GET del producto con ID:${id} : `, error);
            }
        }else if(endpoint === "products" && id === -1){
            try{
                const response = await fetch('https://fakestoreapi.com/products');
                const data= await response.json();
                console.log(data);
            }catch (error){
                console.error("Error el fetch del metodo GET: ", error);
            }      
        }else{
            console.log("Error en los argumentos del metodo GET");
        }

        break;
    
    case "post":
        if(argvProducto[0] !== undefined && argvProducto[1] !== undefined && argvProducto[2] !== undefined){
            try{
                const product = { title: argvProducto[0], price: argvProducto[1], category: argvProducto[2] };
                fetch('https://fakestoreapi.com/products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(product)
                })
                .then(response => response.json())
                .then(data => console.log(data));
        
                console.log(`Producto ${product.title} agregado`);
            }catch (error){
                console.error("Error en el fecth de metodo POST");
            }
        }else{
            console.log("Error en los argumentos del metodo POST");
        }
        
        break;

    case "delete":
        if(endpoint.startsWith("products/") && id > 0 ){
            try{
                fetch(`https://fakestoreapi.com/products/${id}`, {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(data => console.log(data));
        
                console.log(`Producto ${id} eliminado con exito`);
            }catch (error){
                console.error("Error en el fecth de metodo DELETE");
            }
        }else{
            console.log("Error en los argumentos del metodo DELETE");
        }
        
        break;
    default:
        console.log("Metodo desconocido.");
        break;
}