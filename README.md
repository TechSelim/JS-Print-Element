# JS-Print-Element
HTML: 
<pre>
<button id="print">Print</button>
<div id="print-body">
  Content
</div>
$('#print').click(function(event) {
  $("#print-body").print();
});
</pre>
