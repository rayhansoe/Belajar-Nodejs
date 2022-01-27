const cetakNama = nama => `Halo nama saya ${nama}`

const PI = 3.14

const mahasiswa = {
	nama: 'rayhan',
	umur: 20,
	cetakMhs() {
		return `Halo nama saya ${this.nama}, umur saya ${this.umur} tahun.`
	},
}

// module.exports.cetakNama = cetakNama
// module.exports.PI = PI
// module.exports.mahasiswa = mahasiswa

module.exports = { cetakNama, PI, mahasiswa }
