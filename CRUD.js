const fs = require('fs')
const { resolve } = require('node:path');

//1. Crear una funcion que permita leer el archivo e imprimir en consola los koders
const read = async () => {
    try{
        const filePath = resolve('./koder.json')
        const contents = await fs.promises.readFile(filePath, {encoding: 'utf-8'})
        console.log(contents)
    }catch(err){
        console.error(err.message)
    }
}

//2. Crear una funcion que permita agregar un Koder y guardar el archivo con el cambio realizado

const addKoder = async (koder) => {
    try{
        //Leer
        const filePath = resolve('./koder.json')
        const contents = await fs.promises.readFile(filePath, {encoding: 'utf-8'})
        //Actualizar
        let obj = JSON.parse(contents)
        obj.koders.push(koder)
        //Escribir
        let data = JSON.stringify(obj,null,"  ")
        await fs.promises.writeFile(filePath,data, 'utf-8')

        console.log('Koder agregado correctamente...')
    }catch(err){
        console.error(err.message)
    }
}

//addKoder({id: 4, name: 'Luis', lastName: 'López', Age: '34', favoriteFood: 'panuchos'})

//3. Crear una funcion que permita eliminar a un koder por su id y guardar el archivo con el cambio realizado
const deleteKoderById = async (idKoder) => {
    try{
        const filePath = resolve('./koder.json')
        const contents = await fs.promises.readFile(filePath, {encoding: 'utf-8'})

        let obj = JSON.parse(contents)
        let result = obj.koders.filter((item) => item.id !== idKoder)
        
        let data = JSON.stringify({"koders":result},null,"  ")
        await fs.promises.writeFile(filePath,data,'utf-8')

        console.log('Koder eliminado correctamente...')

    }catch(err){
        console.error(err.message)
    }
}

//4. Crear una funcion que permita obtener a los koders que sean mayores de 25 años
const ageKoders = async () => {
    try{
        const filePath = resolve('./koder.json')
        const contents = await fs.promises.readFile(filePath, {encoding: 'utf-8'})

        let obj = JSON.parse(contents)
        let result = obj.koders.filter((item) => parseInt(item.Age)>25)
        console.log('Los koders mayores de 25 años son: ')
        console.log(result)       
    }catch(err){
        console.error(err.message)
    }
}

//ageKoders()
//5. Crear una funcion que permita editar a un koder por su id y guardar el archivo con el cambio realizado
const editKoderById = async (id,name,lastName,Age,favoriteFood) => {
    try{
        const filePath = resolve('./koder.json')
        const contents = await fs.promises.readFile(filePath, {encoding: 'utf-8'})

        let obj = JSON.parse(contents)
        for(let i = 0; i < obj.koders.length; i++){
            if(obj.koders[i].id === id){
                obj.koders[i].name = name
                obj.koders[i].lastName = lastName
                obj.koders[i].Age = Age
                obj.koders[i].favoriteFood = favoriteFood
                break
            }
        }

        let data = JSON.stringify(obj,null,"  ")
        await fs.promises.writeFile(filePath,data,'utf-8')

        console.log('Koder modificado correctamente...')
    }catch(err){
        console.error(err.message)
    }
}
//editKoderById(3,"Juana","Rodríguez",21,"Cochinita pivil")

//6. Crear una funcion que permita recibir un id utilizando process.argv y devuelva el correspondiente si existe
const koderById = async () => {
    const idKoder = parseInt(process.argv[2])

    try {
        const filePath = resolve('./koder.json')
        const contents = await fs.promises.readFile(filePath, {encoding: 'utf-8'})

        let obj = JSON.parse(contents)
        let result = obj.koders.filter(item => item.id === idKoder)
        console.log(result)
    }catch(err){
        console.error(err.message)
    }
}

koderById()