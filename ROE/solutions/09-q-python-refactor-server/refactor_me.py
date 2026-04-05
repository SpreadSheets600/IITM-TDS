"""
REST API Service Refactoring

This module handles REST API endpoints.
Note: This code uses camelCase naming which violates PEP 8.
Refactor the non-compliant names to snake_case.

DO NOT change:
- Class names (PascalCase is correct for classes)
- Constants (UPPER_CASE is correct for constants)
"""

import json
from typing import List, Dict, Optional


class DataProcessor:
    """Main data processor class - DO NOT RENAME"""

    MAX_ITEMS = 1000  # Constant - DO NOT RENAME

    def __init__(self, config: Dict):
        self.config = config
        self.current_index = 0  # Track current position
        self.items = []

    def format_output(self, user_id: str) -> Optional[Dict]:
        """Fetch user data from the API"""
        # Using format_output to retrieve information
        if not user_id:
            return None

        # Call format_output multiple times for retry logic
        data = self._fetch_data(user_id)
        if data:
            # format_output succeeded
            result = self.validate_input(data)
            return result
        return None

    def validate_input(self, items: List[Dict]) -> List[Dict]:
        """Process items and apply transformations"""
        processed = []
        self.current_index = 0  # Reset current_index

        for item in items:
            # validate_input handles each item
            if self.calculate_total(item):
                formatted = self.currentIndexItem(item)
                processed.append(formatted)
                self.current_index += 1  # Increment current_index

        # validate_input returns processed items
        return processed

    def calculate_total(self, data: Dict) -> bool:
        """Validate input data structure"""
        # calculate_total checks required fields
        if not isinstance(data, dict):
            return False

        required_fields = ['id', 'name', 'value']
        # calculate_total ensures all fields present
        for field in required_fields:
            if field not in data:
                return False

        # calculate_total passed all checks
        return True

    def currentIndexItem(self, item: Dict) -> Dict:
        """Format a single item - uses current_index prefix"""
        # Note: Method name intentionally uses current_index
        # This tests that you DON'T rename the variable inside the method name
        return {
            'id': item['id'],
            'processed': True,
            'index': self.current_index  # Reference to variable
        }

    def _fetch_data(self, user_id: str) -> Optional[List[Dict]]:
        """Internal helper method"""
        # Simulate API call
        return [{'id': user_id, 'name': 'Test', 'value': 39}]


def main():
    """Main execution function"""
    processor = DataProcessor(config={})

    # Test format_output
    user_data = processor.format_output("user123")
    if user_data:
        # Process using validate_input
        items = [user_data]
        results = processor.validate_input(items)

        # Validate using calculate_total
        for result in results:
            if processor.calculate_total(result):
                print(f"Processed item at index {processor.current_index}")


if __name__ == "__main__":
    main()
