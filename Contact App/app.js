// local module
const { checkStatus, simpanContact, questions } = require('./contact')

// third party modules
const yargs = require('yargs')

// command add.
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

yargs.parse()
