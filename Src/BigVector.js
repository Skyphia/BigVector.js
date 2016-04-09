/*
 * Creates and manipulates vectors using arbitrary-precision 
 * arithmetic. Components: an array containing the components of the 
 * vector represented as arbitrary-precision numbers using the 
 * library big.js.
 */
function BigVector(components) {
	this.components = components;
	
	/*
	 * Returns an array containing the components of the vector.
	*/
	this.getComponents = function() {
		return this.components;
	};
	
	/*
	 * Returns the vector's magnitude as an arbitrary precision 
	 * number.
	 */
	this.magnitude = function() {
		var sumOfSquares = new Big(0);
		for (var i = 0; i < this.components.length; i++) {
			sumOfSquares = sumOfSquares.plus(this.components[i].pow(2));
		}
		return sumOfSquares.sqrt();
	};
	
	/*
	 * Returns the vector's direction represented as the components of the vector
	 * normalized to have unit magnitude. If the vector is of magnitude zero, NaN
	 * is returned.
	 */
	this.direction = function() {
		if (!this.magnitude().eq(new Big(0))) {
			var components = [];
			for (var i = 0; i < this.components.length; i++) {
				var normalizedComponent = this.components[i].div(this.magnitude());
				components.push(normalizedComponent);
			}
			return new BigVector(components);
		} else {
			return NaN;
		}
	};
	
	/*
	 * Returns the vector sum of the current vector and bigVector. 
	 * Precondition: the current vector and bigVector have 
	 * the same number of dimensions.
	 */
	this.plus = function(bigVector) {
		var components = [];
		for (var i = 0; i < this.components.length; i++) {
			var sum = this.components[i].add(bigVector.components[i]);
			components.push(sum);
		}
		return new BigVector(components);
	};
	
	/*
	 * Returns the vector difference of the current vector and bigVector.
	 * Precondition: the current vector and bigVector have 
	 * the same number of dimensions.
	 */
	this.minus = function(bigVector) {
		var components = [];
		for (var i = 0; i < this.components.length; i++) {
			var difference = this.components[i].minus(bigVector.components[i]);
			components.push(difference);
		}
		return new BigVector(components);
	};
	
	/*
	 * Returns the current vector scaled by the arbitary-precision 
	 * number bigScalar.
	 */
	this.scale = function(bigScalar) {
		var components = [];
		for (var i = 0; i < this.components.length; i++) {
			var product = this.components[i].times(bigScalar);
			components.push(product);
		}
		return new BigVector(components);
	};
	
	/* 
	 * Returns the dot product of the current vector and bigVector 
	 * as an arbitrary-precision number.
	 */
	this.dot = function(bigVector) {
		var sum = new Big(0);
		for (var i = 0; i < this.components.length; i++) {
			var product = this.components[i].times(bigVector.components[i]);
			sum = sum.plus(product);
		}
		return sum;
	};
	
	return this;
}