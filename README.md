# JS-Print-Element
HTML: 
<button id="print">Print</button>
<div id="print-body">
  Content
</div>
$('#print').click(function(event) {
  $("#print-body").print();
});

