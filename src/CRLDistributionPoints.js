import * as asn1js from "asn1js";
import { getParametersValue } from "pvutils";
import DistributionPoint from "./DistributionPoint";
//**************************************************************************************
/**
 * Class from RFC5280
 */
export default class CRLDistributionPoints
{
	//**********************************************************************************
	/**
	 * Constructor for CRLDistributionPoints class
	 * @param {Object} [parameters={}]
	 * @property {Object} [schema] asn1js parsed value
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {Array.<DistributionPoint>}
		 * @description distributionPoints
		 */
		this.distributionPoints = getParametersValue(parameters, "distributionPoints", CRLDistributionPoints.defaultValues("distributionPoints"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "distributionPoints":
				return [];
			default:
				throw new Error(`Invalid member name for CRLDistributionPoints class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of asn1js schema for current class
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		// CRLDistributionPoints OID ::= 2.5.29.31
		//
		//CRLDistributionPoints ::= SEQUENCE SIZE (1..MAX) OF DistributionPoint

		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [distributionPoints]
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new asn1js.Sequence({
			name: (names.blockName || ""),
			value: [
				new asn1js.Repeated({
					name: (names.distributionPoints || ""),
					value: DistributionPoint.schema()
				})
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema,
			schema,
			CRLDistributionPoints.schema({
				names: {
					distributionPoints: "distributionPoints"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for CRLDistributionPoints");
		//endregion

		//region Get internal properties from parsed schema
		this.distributionPoints = Array.from(asn1.result.distributionPoints, element => new DistributionPoint({ schema: element }));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Construct and return new ASN.1 schema for this object
		return (new asn1js.Sequence({
			value: Array.from(this.distributionPoints, element => element.toSchema())
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		return {
			distributionPoints: Array.from(this.distributionPoints, element => element.toJSON())
		};
	}
	//**********************************************************************************
}
//**************************************************************************************