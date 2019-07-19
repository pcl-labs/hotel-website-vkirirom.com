module.exports = {
  presets: [
    '@vue/app'
  ],
  env: {
    test: {
      presets: ["env", "stage-2"],
      plugins: [ "istanbul" ]
    }
  }
}
