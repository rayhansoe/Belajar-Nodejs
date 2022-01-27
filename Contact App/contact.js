// modules
const fs = require('fs')
const readline = require('readline')

// vars
const dirPath = 'data'
const filePath = 'data/contacts.json'

// Check Folder data exist atau tidak.
const checkFolder = fs.existsSync(dirPath)

// Check contacts.json exist atau tidak
const checkFile = fs.existsSync(filePath)

// checkStatus
const checkStatus = () => {
	if (!checkFolder) fs.mkdirSync(dirPath)
	if (!checkFile) fs.writeFileSync(filePath, '[]')
}

// ReadLine Init.
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

// question maker
const questionMaker = question => {
	return new Promise((resolve, rejects) => {
		rl.question(question, answer => {
			resolve(answer)
		})
	})
}

// tulis data
const writeDataToFile = (data, nama) => {
	fs.writeFileSync(filePath, JSON.stringify(data))
	console.log(`Terima kasih ${nama}`)
}

// Pertanyaan v1
const questions = async () => {
	// target File
	const targetFile = fs.readFileSync(filePath, 'utf-8')

	// QnA
	const nama = await questionMaker('Masukan nama anda: ')
	const email = await questionMaker('Masukan email anda: ')
	const noHp = await questionMaker('Masukan no Hp anda: ')

	// from file raw pase to JSON
	const contacts = JSON.parse(targetFile)

	// amanin data
	const contact = { nama, email, noHp }

	// push data
	contacts.push(contact)

	// tulis data / save data
	writeDataToFile(contacts, nama)

	// reAsk
	reAsk()
}

// close the app
const closeApp = () => rl.close()

// reAsk
const reAsk = async () => {
	console.log('\nmasukan data lagi?')
	const userDecitionRaw = await questionMaker('Yes / No: ')
	const userDecition = userDecitionRaw.toLowerCase()

	if (userDecition === 'yes') {
		console.log('\n')
		questions()
	} else if (userDecition === 'no') {
		closeApp()
	} else {
		console.log('\nJUST YES OR NO!!!')
		console.log('RETARD!!!')
		reAsk(reAsk)
	}
}

module.exports = {
	questions,
	checkStatus,
}
