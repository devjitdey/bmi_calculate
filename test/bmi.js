const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const should = chai.should();

chai.use(chaiHttp);
describe('Calculate bmi values', () => {
  describe('GET /calculateBmi', () => {
    it('it should GET bmi, bmi_category and health risk', (done) => {
      chai.request('http://localhost:5000')
          .get('/calculateBmi')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            done();
          });
    });
  });
})
