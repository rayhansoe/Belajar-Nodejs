// modules
const fs = require('fs')
const readline = require('readline')

// third party modules
const validator = require('validator')

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

// simpan data
const simpanContact = (nama, email, noHp, isDirect = true) => {
	// target File
	const targetFile = fs.readFileSync(filePath, 'utf-8')

	// amanin data
	const contact = { nama, email, noHp }

	// from file raw parse to JSON
	const contacts = JSON.parse(targetFile)

	// check nama duplicate
	const isDuplicate = contacts.find(contact => contact.nama === nama)
	if (isDuplicate) {
		console.log('Contact sudah terdaftar, gunakan nama lain!')
		if (isDirect) {
			closeApp()
			return false
		} else {
			return false
		}
	}

	// check email is valid
	if (email) {
		if (!validator.isEmail(email)) {
			// console.log(chalk.red.inverse.bold('Email yang kamu masukan tidak valid!'))
			console.log('Email yang kamu masukan tidak valid!')
			if (isDirect) {
				closeApp()
				return false
			} else {
				return false
			}
		}
	}

	// check noHp is valid
	if (!validator.isMobilePhone(noHp, 'id-ID')) {
		// console.log(chalk.red.inverse.bold('Nomor yang kamu masukan tidak valid!'))
		console.log('Nomor yang kamu masukan tidak valid!')
		if (isDirect) {
			closeApp()
			return false
		} else {
			return false
		}
	}

	// push data
	contacts.push(contact)

	// save data ke file
	fs.writeFileSync(filePath, JSON.stringify(contacts))
	console.log(`Terima kasih ${nama}. Contact berhasil dimasukan.`)

	// jika direct di command line langsung tutup
	if (isDirect) {
		closeApp()
	}
}

// Pertanyaan v1
const questions = async () => {
	// QnA
	const nama = await questionMaker('Masukan nama anda: ')
	const email = await questionMaker('Masukan email anda: ')
	const noHp = await questionMaker('Masukan no Hp anda: ')

	// tulis data / save data
	simpanContact(nama, email, noHp, false)

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
	simpanContact,
}
