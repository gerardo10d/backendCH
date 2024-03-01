const express = require('express')
const fs = require('fs')
const { ProductManager } = require('./ProductManager')

const app = express()

const path = `${__dirname}/../assets/productos.json`;
const manager = new ProductManager(path);

app.use(express.urlencoded({ extended: true }))

app.get('/saludo', (req, res) => {
	res.send('Hola a todos, pero ahora desde express')
})

// products?limit=L => límite de cantidad de productos a mostrar
app.get('/products', async (req, res) => {
	try {
		const products = await manager.getProducts()
		const limitToFilter = req.query.limit
		const filteredProducts = products.slice(0, limitToFilter)
		res.json(filteredProducts || products)
		return
	} catch (err) {
		res.json({ error: 'Error al obtener los productos' })
	}


})

app.get('/products/:pid', async (req, res) => {
	try {
		const product = await manager.getProductById(+req.params.pid)
		// const pid = +req.params.pid
		// const product = products.find(p => p.id === pid)
		res.json(product)
	} catch (err) {
		res.json( { error: 'Error al obtener el producto ' + req.params.pid})
	}

})

app.get('/file', async (req, res) => {
	const fileContents = await fs.promises.readFile('./test.txt', 'utf-8')
	res.end(fileContents)
})

app.listen(8080, () => console.log("¡Servidor arriba en el puerto 8080!"))
