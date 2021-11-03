# JS-Print-Element
HTML: 
<pre>
<code>
&lt;button id="print"&gt;Print&lt;/button&gt;
<div id="print-body">
  Content
</div>
$('#print').click(function(event) {
  $("#print-body").print();
});
</code>
</pre>
