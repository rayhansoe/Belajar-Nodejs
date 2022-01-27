const { checkStatus, questions } = require('./contact')

// Main
const main = async () => {
	// Check Folder & File
	checkStatus()

	// the questions
	questions()
}

main()
