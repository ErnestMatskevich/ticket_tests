import renderer from 'react-test-renderer';
import PersonalPage from '../src/pages/PersonalPage/ui/PersonalPage'


describe('PersonalPage component', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<PersonalPage />).toJSON();
        expect(tree).toMatchSnapshot();
    });
})