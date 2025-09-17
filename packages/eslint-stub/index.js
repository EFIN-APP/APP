class StubESLint {
  static version = "9.0.0-stub"

  static async outputFixes() {
    return
  }

  static getErrorResults(results) {
    return Array.isArray(results) ? results.filter((result) => result?.errorCount > 0) : []
  }

  constructor(options = {}) {
    this.options = options
  }

  async calculateConfigForFile() {
    return {
      plugins: ["@next/next"],
      rules: {},
    }
  }

  async lintFiles() {
    return []
  }

  async loadFormatter() {
    return {
      format() {
        return ""
      },
    }
  }
}

async function loadESLint() {
  return StubESLint
}

module.exports = {
  ESLint: StubESLint,
  loadESLint,
}
