require.config({ paths: { vs: '/pythonr/vs' } });

require(['vs/editor/editor.main'], function () {
	var editor = monaco.editor.create(document.getElementById('container'), {
		value: document.getElementById('text').innerText,
		language: 'python',
		minimap: false,
		scrollBeyondLastLine: false,
		heightInPx: 800,
	});

	var form = document.getElementById('submitter');
	form.action = document.location.pathname;
	var formCodeInput = document.getElementById('codeInput');

	form.onsubmit = function () {
		formCodeInput.value = monaco.editor
			.getModel('inmemory://model/1')
			.getValue();
	};
});
