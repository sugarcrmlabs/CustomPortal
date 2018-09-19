<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Zend\Http\Client as ZendClient;
use \Zend\Http\Request as ZendRequest;

require '../vendor/autoload.php';

$app = new \Slim\App;

$container = $app->getContainer();

$container['view'] = function ($container) {
    return new \Slim\Views\PhpRenderer('../app/build/');
};

$app->post('/login', function (Request $request, Response $response, array $args) {
    $params = $request->getParams();

    $loginParams = array(
        'platform' => 'portal',
        'grant_type' => 'password',
        'client_id' => 'support_portal',
        'username' => $params['username'],
        'password' => $params['password']
    );

    $loginRequest = new ZendRequest();

    $loginRequest->setMethod(ZendRequest::METHOD_POST);
    $loginRequest->setUri(rtrim($params['sugar_url'], '/') . '/rest/v11_1/oauth2/token');
    $loginRequest->setPost(new \Zend\Stdlib\Parameters($loginParams));

    $zendClient = new ZendClient();

    $loginResponse = $zendClient->send($loginRequest);

    $response->getBody()->write($loginResponse->getBody());

    return $response->withStatus($loginResponse->getStatusCode());
});

$app->post('/refresh-token', function (Request $request, Response $response, array $args) {
    $params = $request->getParams();

    $refreshParams = array(
        'platform' => 'portal',
        'grant_type' => 'refresh_token',
        'client_id' => 'support_portal',
        'refresh_token' => $params['refreshToken']
    );

    $refreshRequest = new ZendRequest();

    $refreshRequest->setMethod(ZendRequest::METHOD_POST);
    $refreshRequest->setUri(rtrim($params['sugar_url'], '/') . '/rest/v11/oauth2/token');
    $refreshRequest->setPost(new \Zend\Stdlib\Parameters($refreshParams));

    $zendClient = new ZendClient();

    $refreshResponse = $zendClient->send($refreshRequest);


    $response->getBody()->write($refreshResponse->getBody());

    return $response->withStatus($refreshResponse->getStatusCode());
});

$app->get('/topKbRows', function (Request $request, Response $response, array $args) {
    $params = $request->getParams();

    $args = array(
        'top_5' => 1
    );

    $filterRequest = new ZendRequest();


    $filterRequest->setMethod(ZendRequest::METHOD_GET);
    $filterRequest->setUri(rtrim($params['sugar_url'], '/') . '/rest/v11/getKnowledge');
    $filterRequest->setQuery(new \Zend\Stdlib\Parameters($args));
    $filterRequest->setHeaders((new \Zend\Http\Headers())->addHeaders(array('OAuth-Token' => $params['token'])));

    $zendClient = new ZendClient();

    $filterResponse = $zendClient->send($filterRequest);

    $response->getBody()->write($filterResponse->getBody());

    return $response->withStatus($filterResponse->getStatusCode());
});

$app->get('/searchKbRows', function (Request $request, Response $response, array $args) {
    $params = $request->getParams();

    $args = array(
        'search' => $params['search'],
        'category' => $params['category'],
    );

    $filterRequest = new ZendRequest();


    $filterRequest->setMethod(ZendRequest::METHOD_GET);
    $filterRequest->setUri(rtrim($params['sugar_url'], '/') . '/rest/v11/getKnowledge');
    $filterRequest->setQuery(new \Zend\Stdlib\Parameters($args));
    $filterRequest->setHeaders((new \Zend\Http\Headers())->addHeaders(array('OAuth-Token' => $params['token'])));

    $zendClient = new ZendClient();

    $filterResponse = $zendClient->send($filterRequest);

    $response->getBody()->write($filterResponse->getBody());

    return $response->withStatus($filterResponse->getStatusCode());
});

$app->get('/getTickets', function (Request $request, Response $response, array $args) {
    $params = $request->getParams();

    $args = array(
        'search' => $params['search'],
        'category' => $params['category'],
    );

    $filterRequest = new ZendRequest();


    $filterRequest->setMethod(ZendRequest::METHOD_GET);
    $filterRequest->setUri(rtrim($params['sugar_url'], '/') . '/rest/v11/getTickets');
    $filterRequest->setQuery(new \Zend\Stdlib\Parameters($args));
    $filterRequest->setHeaders((new \Zend\Http\Headers())->addHeaders(array('OAuth-Token' => $params['token'])));

    $zendClient = new ZendClient();

    $filterResponse = $zendClient->send($filterRequest);

    $response->getBody()->write($filterResponse->getBody());

    return $response->withStatus($filterResponse->getStatusCode());
});

$app->post('/submit-question', function (Request $request, Response $response, array $args) {
    $params = $request->getParams();

    $createRequest = new ZendRequest();

    $createRequest->setMethod(ZendRequest::METHOD_POST);
    $createRequest->setUri(rtrim($params['sugar_url'], '/') . '/rest/v11/submitCase');
    $createRequest->setPost(new \Zend\Stdlib\Parameters($params));
    $createRequest->setHeaders((new \Zend\Http\Headers())->addHeaders(array('OAuth-Token' => $params['token'])));

    $zendClient = new ZendClient();

    $createResponse = $zendClient->send($createRequest);
    
    $response->getBody()->write($createResponse->getBody());

    return $response->withStatus($createResponse->getStatusCode());
});

$app->delete('/ticket/[{id}]', function (Request $request, Response $response, array $args) {
    $params = $request->getParams();

    $deleteRequest = new ZendRequest();

    $deleteRequest->setMethod(ZendRequest::METHOD_DELETE);
    $deleteRequest->setUri(rtrim($params['sugar_url'], '/') . '/rest/v11/deleteTicket/' . $args['id']);
    $deleteRequest->setHeaders((new \Zend\Http\Headers())->addHeaders(array('OAuth-Token' => $params['token'])));

    $zendClient = new ZendClient();

    $deleteResponse = $zendClient->send($deleteRequest);

    $response->getBody()->write($deleteResponse->getBody());

    return $response->withStatus($deleteResponse->getStatusCode());
});

$app->get('/getTicket/[{id}]', function (Request $request, Response $response, array $args) {
    $params = $request->getParams();

    $deleteRequest = new ZendRequest();

    $deleteRequest->setMethod(ZendRequest::METHOD_GET);
    $deleteRequest->setUri(rtrim($params['sugar_url'], '/') . '/rest/v11/getTicket/' . $args['id']);
    $deleteRequest->setHeaders((new \Zend\Http\Headers())->addHeaders(array('OAuth-Token' => $params['token'])));

    $zendClient = new ZendClient();

    $deleteResponse = $zendClient->send($deleteRequest);

    $response->getBody()->write($deleteResponse->getBody());

    return $response->withStatus($deleteResponse->getStatusCode());
});

$app->get('/getNewsFeed', function (Request $request, Response $response, array $args) {
    $feedRequest = new ZendRequest();


    $feedRequest->setMethod(ZendRequest::METHOD_GET);
    $feedRequest->setUri('https://www.sugarcrm.com/blog/');

    $zendClient = new ZendClient();

    $feedResponse = $zendClient->send($feedRequest);
    $titleList = [];

    $dom = new DOMDocument();
    $dom->loadHTML($feedResponse->getBody());

    $xpath = new DOMXPath($dom);
    $titleContent = $xpath->query("//h2[contains(@class, 'entry-title')]/a");
    foreach ($titleContent as $title) {
        $tmp = ['link' => $title->getAttribute('href'),
                'content' => $title->nodeValue];

        $titleList[] = $tmp;
    }

    $response->getBody()->write(json_encode($titleList));

    return $response->withStatus($feedResponse->getStatusCode());
});

$app->get('/[{path:.*}]', function (Request $request, Response $response, array $args) {
    $response = $this->view->render($response, "index.html");
});

$app->run();