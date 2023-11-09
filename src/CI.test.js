//Placeholder test
test('That function has been called', () => {
	const mock = jest.fn();
	const result = mock();
	expect(mock).toHaveBeenCalled();
})
