function openTab(tabId) {
  // Hide all tab content
  const contents = document.querySelectorAll('.tab-content');
  contents.forEach(content => content.classList.remove('active'));

  // Remove active class from all buttons
  const buttons = document.querySelectorAll('.nav-btn');
  buttons.forEach(button => button.classList.remove('active'));

  // Show selected tab and activate button
  document.getElementById(tabId).classList.add('active');
  event.currentTarget.classList.add('active');
}
