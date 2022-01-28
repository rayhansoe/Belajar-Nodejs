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

// getFile
const getFile = () => {
	// target File
	const targetFile = fs.readFileSync(filePath, 'utf-8')

	// from file raw parse to JSON
	const contacts = JSON.parse(targetFile)

	return contacts
}

// simpan data
const simpanContact = (nama, email, noHp, isDirect = true) => {
	// get file & filePath
	const contacts = getFile()

	// amanin data
	const contact = { nama, email, noHp }

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

// getContacts
const getContacts = (key = '') => {
	// get contacts
	const contacts = getFile()

	// check contacts
	if (!contacts.length) {
		console.log('Tidak ada data yang tersedia saat ini.')
		closeApp()
		return false
	}

	// get all contacts
	if (!key && contacts) {
		console.table(contacts)
		closeApp()
	}

	// get by key
	if (key && contacts) {
		getByKey(key, contacts)
		closeApp()
	}
}

// get by key
const getByKey = (key, contacts) => {
	// filter by key
	const byName = contacts.filter(ct => ct.nama === key)
	const byEmail = contacts.filter(ct => ct.email === key)
	const byNoHp = contacts.filter(ct => ct.noHp === key)

	// filter by key
	const contact =
		(byName.length && byName) || (byEmail.length && byEmail) || (byNoHp.length && byNoHp)

	// check contact
	if (!contact) {
		console.log('Data yang anda masukan tidak tersedia atau tidak valid.')
		closeApp()
		return false
	}

	// print contact
	console.table(contact)
	closeApp()
}

module.exports = {
	questions,
	checkStatus,
	simpanContact,
	getContacts,
}
