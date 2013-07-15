/*
	Gerrit Rietveld's Child's Wheelbarrow
	Modeled by Eder Monaco
*/

var blackColor = [0/255,0/255,0/255];
var blueColor = [0/255,0/255,128/255];
var redColor = [255/255,0/255,0/255];
var yellowColor = [255/255,255/255,0/255];
var whiteColor = [300/255,300/255,300/255];

var cylinder = function(radius, height, quality) {
	var disk = DISK(radius)([quality, 2]);
	var result = EXTRUDE([height])(disk);
	return result;
};

var wheelBarrow = function(){

	var domain2D = PROD1x1([INTERVALS(1)(20),INTERVALS(1)(20)]);

	//Wheel
	var mainWheel = COLOR(redColor)(cylinder(1, 0.4, 128));
	var borderWheel = COLOR(blackColor)(T([0,1,2])([0,0,0.05])(cylinder(1.1, 0.3, 128)));
	var wheel = T([0,1,2])([0,0,-0.2])(STRUCT([mainWheel, borderWheel]));

	//Bars
	var wheelBar1 = COLOR(blackColor)(T([0,1,2])([0,0,-2.2])(cylinder(0.1, 4.4, 128)));
	var wheelBar2 = COLOR(whiteColor)(T([0,1,2])([0,0,-2.2001])(cylinder(0.099, 4.401, 128)));
	var pushingBar11 = COLOR(whiteColor)(cylinder(0.1, 6, 128));
	var pushingBar12 = COLOR(blackColor)(T([0,1,2])([0,0,-0.001])(cylinder(0.0999, 7, 128)));
	var pushingBar1 = T([0,1,2])([-0.3,0.21,1.8])(R([0,2])([PI/2])(STRUCT([pushingBar11, pushingBar12])));
	var pushingBar2 = T([0,1,2])([0,0,-3.6])(pushingBar1);
	var gripRadius = 0.02;
	var c0 = BEZIER(S0)([[-0.09,0.2,-gripRadius],[-0.1,0.15,-gripRadius],[-0.2,0,-gripRadius],[0,-0.155,-gripRadius],[0.2,0,-gripRadius],[0.1,0.15,-gripRadius],[0.09,0.2,-gripRadius]]);
	var c1 = BEZIER(S0)([[-0.09,0.2,gripRadius],[-0.1,0.15,gripRadius],[-0.2,0,gripRadius],[0,-0.155,gripRadius],[0.2,0,gripRadius],[0.1,0.15,gripRadius],[0.09,0.2,gripRadius]]);
	var cOuter = BEZIER(S0)([[-0.11,0.2,0],[-0.12,0.15,0],[-0.22,0,0],[0,-0.17,0],[0.22,0,0],[0.12,0.15,0],[0.11,0.2,0]]);
	var cInner = BEZIER(S0)([[-0.07,0.2,0],[-0.08,0.15,0],[-0.18,0,0],[0,-0.13,0],[0.18,0,0],[0.08,0.15,0],[0.07,0.2,0]]);
	var connectorBezierOuter = MAP(BEZIER(S1)([c0, cOuter, c1]))(domain2D);
	var connectorBezierInner = MAP(BEZIER(S1)([c0, cInner, c1]))(domain2D);
	var connectorBezier = STRUCT([connectorBezierInner, connectorBezierOuter]);
	var connector1 = COLOR(whiteColor)(T([0,1,2])([0,-0.089,1.8])(connectorBezier));
	var connector2 = T([0,1,2])([0,0,-3.6])(connector1);
	var bars = STRUCT([wheelBar1, wheelBar2, pushingBar1, pushingBar2, connector1, connector2]);
	
	//Sides
	var sc0 = BEZIER(S0)([[-0.4,1.8,1.95],[4,1.8,1.95]]);
	var sc1 = BEZIER(S0)([[4,-0.9,1.95]]);
	var sideA = MAP(BEZIER(S1)([sc0, sc1]))(domain2D);
	var sideB = T([0,1,2])([0,0,-0.05])(sideA);
	var scTop1 = BEZIER(S0)([[-0.4,1.8,1.95],[4,1.8,1.95]]);
	var scTop2 = BEZIER(S0)([[-0.42,1.8,1.925],[-0.42,1.82,1.925],[4.1,1.82,1.925]]);
	var scTop3 = BEZIER(S0)([[-0.4,1.8,1.9],[4,1.8,1.9]]);
	var sideTopBezier = MAP(BEZIER(S1)([scTop1, scTop2, scTop3]))(domain2D);
	var scRight1 = BEZIER(S0)([[4,1.8,1.95],[4,-0.9,1.95]]);
	var scRight2 = BEZIER(S0)([[4.1,1.82,1.925],[4.1,-0.93,1.925]]);
	var scRight3 = BEZIER(S0)([[4,1.8,1.9],[4,-0.9,1.9]]);
	var sideRightBezier = MAP(BEZIER(S1)([scRight1, scRight2, scRight3]))(domain2D);
	var scBottom1 = BEZIER(S0)([[-0.4,1.8,1.95],[4,-0.9,1.95]]);
	var scBottom2 = BEZIER(S0)([[-0.42,1.8,1.925],[-0.42,1.78,1.925],[3.9,-0.95,1.925]]);
	var scBottom3 = BEZIER(S0)([[-0.4,1.8,1.9],[4,-0.9,1.9]]);
	var sideBottomBezier = MAP(BEZIER(S1)([scBottom1, scBottom2, scBottom3]))(domain2D);
	var sides1 = COLOR(yellowColor)(T([0,1,2])([0,0.1,0])(STRUCT([sideA, sideB, sideTopBezier, sideRightBezier, sideBottomBezier])));
	var sides2 = T([0,1,2])([0,0,-3.85])(sides1);
	var stabilizerA = COLOR(blackColor)(T([0,1,2])([3.6,-0.9,1.7])(CUBOID([0.45,0.3,0.45])));
	var stabilizerB = T([0,1,2])([0,0,-3.85])(stabilizerA);

	//Model
	var model = STRUCT([wheel, bars, sides1, sides2, stabilizerA, stabilizerB]);
	return model;

};

DRAW(wheelBarrow());