// local module
const { checkStatus, simpanContact, questions, getContacts } = require('./contact')

// third party modules
const yargs = require('yargs')

// command add / Create.
yargs.command({
	command: 'add',
	describe: 'Menambahkan contact baru',
	builder: {
		nama: {
			describe: 'Nama lengkap',
			demandOption: true,
			type: 'string',
		},
		email: {
			describe: 'Email',
			demandOption: false,
			type: 'string',
		},
		noHp: {
			describe: 'Nomor Handphone',
			demandOption: true,
			type: 'string',
		},
	},
	handler(argv) {
		// checkStatus / folder and file is exist.
		checkStatus()

		// simpan contact
		simpanContact(argv.nama, argv.email, argv.noHp)
	},
})

// commad run old way.
yargs.command({
	command: 'run',
	describe: 'old way input contact',
	handler(argv) {
		// checkStatus / folder and file is exist.
		checkStatus()
		questions()
	},
})

// command Read / Get Contacts
yargs.command({
	command: 'getContacts',
	describe: 'Menampilkan semua kontak atau satu kontak.',
	builder: {
		nama: {
			describe: 'mencari dengan nama',
			demandOption: false,
			type: 'string',
		},
		email: {
			describe: 'mencari dengan email',
			demandOption: false,
			type: 'string',
		},
		noHp: {
			describe: 'mencari dengan noHp',
			demandOption: false,
			type: 'string',
		},
	},
	handler(argv) {
		// check status
		checkStatus()

		// check argv
		const check = argv.nama || argv.email || argv.noHp
		if (!check) {
			getContacts()
			return false
		}
		getContacts((key = check))
	},
})

yargs.parse()
