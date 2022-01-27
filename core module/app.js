const fs = require('fs')

// menulis Sync
// try {
// 	fs.writeFileSync('data/data.txt', 'hi nama saya rayhan')
// } catch (error) {
// 	console.log(error)
// }

// menulis Async
// fs.writeFile('data/data.txt', 'Hi! nama saya rayhan.', 'utf-8', err => {
// 	if (err) throw err
// 	console.log('Data berhasil tersimpan.')
// })

// read file Sync
// const data = fs.readFileSync('data/data.txt')
// console.log(data.toString())

// read file Async
// fs.readFile('data/data.txt', (err, data) => {
// 	if (err) throw err
// 	console.log(`"${data}" - from data/data.txt`)
// })

// readline
const readline = require('readline')

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

// Pertanyaan with writeFile
// rl.question('Nama: ', answer => {
// 	const data = `Nama: ${answer}`

// 	fs.writeFile('data/data.txt', data, 'utf-8', err => {
// 		if (err) throw err
// 		console.log('Nama anda berhasil ditulis.')
// 	})

// 	console.log(`Terimakasih ${answer}`)

// 	rl.close()
// })

// 2 Pertanyaan
rl.question('Masukan nama anda: ', nama => {
	rl.question('Masukan no HP anda: ', noHp => {
		const contact = { nama, noHp }

		const file = fs.readFileSync('data/contacts.json', 'utf-8')
		const contacts = JSON.parse(file)
		// console.log(contacts)

		contacts.push(contact)

		fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))

		console.log('terima kasih')

		rl.close()
	})
})
