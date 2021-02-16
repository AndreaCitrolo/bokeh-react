from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from bokeh.plotting import figure
from bokeh.transform import factor_cmap, factor_mark
from bokeh.models import HoverTool
from bokeh.sampledata.iris import flowers
from bokeh.embed import json_item

class FlowersView(APIView):
    
    def get(self, request, format=None):
        SPECIES = ['setosa', 'versicolor', 'virginica']
        MARKERS = ['hex', 'circle_x', 'triangle']

        TOOLTIPS = [("Species", '@species')]

        p = figure(title = "Iris Morphology",  tooltips=TOOLTIPS)
        p.xaxis.axis_label = 'Petal Length'
        p.yaxis.axis_label = 'Sepal Width'

        p.scatter("petal_length", "sepal_width", source=flowers, legend_field="species", fill_alpha=0.4, size=12,
                marker=factor_mark('species', MARKERS, SPECIES),
                color=factor_cmap('species', 'Category10_3', SPECIES), hover_color='firebrick')
        p.add_tools(HoverTool())
        return Response(data=json_item(p, "myplot"))
