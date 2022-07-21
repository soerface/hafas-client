'use strict'

const tap = require('tap')

const createClient = require('..')
const rawProfile = require('../p/sncb')
const resWithChkiLeg = require('./fixtures/sncb-journey-with-chki.json')

const client = createClient(rawProfile, 'public-transport/hafas-client:test')
const {profile} = client

const opt = {
	stopovers: false,
	tickets: false,
	polylines: false,
	subStops: false,
	entrances: false,
	remarks: true,
}

tap.test('parses a journey with a CHKI leg (#267)', (t) => {
	const common = profile.parseCommon({profile, opt, res: resWithChkiLeg})
	const ctx = {profile, opt, common, res: resWithChkiLeg}
	const journey = profile.parseJourney(ctx, resWithChkiLeg.outConL[0])

	const checkinLeg = journey.legs[0]
	t.equal(checkinLeg.checkin, true, 'checkinLeg.checkin')
	t.end()
})
