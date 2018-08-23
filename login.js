function login (form) { // eslint-disable-line no-unused-vars
  var token = form.firstElementChild.value
  form.remove()
  require('./spider.js')(token)
}
